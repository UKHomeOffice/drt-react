import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {render} from '../../TestProviderRenderer';
import {AddShiftBar} from '../AddShiftBar';
import {ConfirmRemoveShift} from '../ConfirmRemoveShift';
import {ConfirmShiftForms} from '../ConfirmShiftForms';
import {ShiftsForm} from '../ShiftsForm';
import {ShiftHotTableView} from '../ShiftHotTableView';

jest.mock('@handsontable/react', () => ({HotTable: () => null}));

const shift = {
  id: 1,
  name: 'Morning',
  startTime: '08:00',
  endTime: '12:00',
  defaultStaffNumber: 3,
  startDate: {year: 2026, month: 11, day: 1},
};

const expectHomeOfficeButton = (button: HTMLElement) => {
  expect(button).toHaveClass('govuk-button--secondary', 'drt-govuk-button--secondary-home-office');
  expect(button).toHaveAttribute('type', 'button');
};

const expectPrimaryButton = (button: HTMLElement) => {
  expect(button).toHaveClass('govuk-button');
  expect(button).not.toHaveClass('govuk-button--secondary');
  expect(button).not.toHaveClass('govuk-button--warning');
  expect(button).toHaveAttribute('type', 'button');
};

test('Create shift pattern and View staffing retain their callbacks', () => {
  const viewStaffing = jest.fn();
  const getStarted = jest.fn();
  render(<AddShiftBar onClickGetStarted={getStarted} onClickViewStaffing={viewStaffing} />);

  const button = screen.getByRole('button', {name: 'View staffing'});
  expectHomeOfficeButton(button);
  fireEvent.click(button);
  expect(viewStaffing).toHaveBeenCalledTimes(1);
  const primaryButton = screen.getByRole('button', {name: 'Create shift pattern'});
  expectPrimaryButton(primaryButton);
  fireEvent.click(primaryButton);
  expect(getStarted).toHaveBeenCalledTimes(1);
});

test('Cancel retains its selector and callback without confirming removal', () => {
  const onCancel = jest.fn();
  const onConfirm = jest.fn();
  render(<ConfirmRemoveShift shift={shift} onCancel={onCancel} onConfirm={onConfirm} />);

  const button = screen.getByRole('button', {name: 'Cancel'});
  expectHomeOfficeButton(button);
  expect(button).toHaveAttribute('data-cy', 'shift-confirm-cancel-button');
  fireEvent.click(button);
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(onConfirm).not.toHaveBeenCalled();

  const remove = screen.getByRole('button', {name: 'Remove'});
  expectPrimaryButton(remove);
  expect(remove).toHaveAttribute('data-cy', 'shift-confirm-remove-button');
  fireEvent.click(remove);
  expect(onConfirm).toHaveBeenCalledWith(shift);
});

test('Add a shift adds another form when the existing shift is valid', () => {
  const consoleError = jest.spyOn(console, 'error');
  try {
    render(<ShiftsForm port="LHR" terminal="T1" interval={60} shiftForms={[shift]}
                       confirmHandler={jest.fn()} formMode="add" disableAdd={false} />);

    const button = screen.getByRole('button', {name: 'Add a shift'});
    expectHomeOfficeButton(button);
    fireEvent.click(button);
    expect(screen.getByText('Shift #2')).toBeInTheDocument();
    expect(consoleError.mock.calls.flat().join(' ')).not.toMatch(/unique.*key|same key/i);
  } finally {
    consoleError.mockRestore();
  }
});

test('Continue advances a valid shift to the confirmation step', () => {
  render(<ShiftsForm port="LHR" terminal="T1" interval={60} shiftForms={[shift]}
                     confirmHandler={jest.fn()} formMode="add" disableAdd={false} />);

  const button = screen.getByRole('button', {name: 'Continue'});
  expectPrimaryButton(button);
  expect(button).toHaveAttribute('data-cy', 'shift-continue-button');
  fireEvent.click(button);
  expect(screen.getByText('Step 2 of 2 - Check your shifts')).toBeInTheDocument();
});

test('shift summary uses GOV.UK buttons and preserves its callbacks', () => {
  const edit = jest.fn();
  const confirm = jest.fn();
  const props = {port: 'LHR', terminal: 'T1', shifts: [shift], editShiftsHandler: edit, confirmHandler: confirm, removeShiftHandler: jest.fn()};
  const {rerender} = render(<ConfirmShiftForms {...props} />);

  expectHomeOfficeButton(screen.getByRole('button', {name: 'Remove shift'}));
  const editButton = screen.getByRole('button', {name: 'Edit'});
  expectHomeOfficeButton(editButton);
  fireEvent.click(editButton);
  expect(edit).toHaveBeenCalledWith([shift]);

  const confirmButton = screen.getByRole('button', {name: 'Confirm'});
  expectPrimaryButton(confirmButton);
  expect(confirmButton).toHaveAttribute('data-cy', 'shift-confirm-button');
  fireEvent.click(confirmButton);
  expect(confirm).toHaveBeenCalledWith([shift]);

  rerender(<ConfirmShiftForms {...props} isEditingPersistedShift />);
  expect(screen.queryByRole('button', {name: 'Remove shift'})).not.toBeInTheDocument();
});

test('Add a shift still validates existing shifts and is hidden when adding is disabled', () => {
  const props = {port: 'LHR', terminal: 'T1', interval: 60, shiftForms: [], confirmHandler: jest.fn(), formMode: 'add'};
  const {rerender} = render(<ShiftsForm {...props} disableAdd={false} />);

  fireEvent.click(screen.getByRole('button', {name: 'Add a shift'}));
  expect(screen.getByText('Please fix the errors before continuing')).toBeInTheDocument();
  expect(screen.queryByText('Shift #2')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
  expect(screen.queryByText('Step 2 of 2 - Check your shifts')).not.toBeInTheDocument();

  rerender(<ShiftsForm {...props} disableAdd />);
  expect(screen.queryByRole('button', {name: 'Add a shift'})).not.toBeInTheDocument();
});

test('time breakdown toggles in both directions and records analytics', () => {
  const sendAnalyticsEvent = jest.fn();
  render(<ShiftHotTableView intervalMinutes={60} viewPeriod="daily" shiftDate={shift.startDate}
                            shiftSummaries={[{index: 0, shiftSummary: shift, staffTableEntries: []}]}
                            handleSaveChanges={jest.fn()} handleEditShift={jest.fn()}
                            handleRemoveShift={jest.fn()} sendAnalyticsEvent={sendAnalyticsEvent}
                            warningsEnabled={false} />);

  const button = screen.getByRole('button', {name: 'Show time breakdown'});
  expectHomeOfficeButton(button);
  expect(button).toHaveAttribute('data-cy', 'shift-show/hide-0');
  fireEvent.click(button);
  expect(sendAnalyticsEvent).toHaveBeenLastCalledWith({category: 'shifts', action: 'Morning', label: 'Show time breakdown'});
  fireEvent.click(screen.getByRole('button', {name: 'Hide time breakdown'}));
  expect(sendAnalyticsEvent).toHaveBeenLastCalledWith({category: 'shifts', action: 'Morning', label: 'Hide time breakdown'});
  expect(screen.getByRole('button', {name: 'Show time breakdown'})).toBeInTheDocument();
});



