import React from 'react';
import moment from 'moment';
import {fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {render} from '../../TestProviderRenderer';
import {UpdateStaffForTimeRangeForm} from '../UpdateStaffForTimeRangeForm';

const staffData = () => ({
  startDayAt: moment('2026-11-03'),
  endDayAt: moment('2026-11-03'),
  startTimeAt: moment('2026-11-03'),
  endTimeAt: moment('2026-11-03'),
  actualStaff: 3,
});

test('Save staff updates uses the full-width primary button and submits the selection', () => {
  const handleSubmit = jest.fn();
  render(<UpdateStaffForTimeRangeForm ustd={staffData()} interval={60} handleSubmit={handleSubmit} cancelHandler={jest.fn()} />);

  const save = screen.getByRole('button', {name: 'Save staff updates'});
  expect(save).toHaveClass('govuk-button', 'drt-govuk-button--full-width');
  expect(save).not.toHaveClass('govuk-button--secondary');
  expect(save).toHaveAttribute('data-cy', 'save-staff-button');
  fireEvent.click(save);
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(expect.objectContaining({actualStaff: 3}));
});

test('Save staff updates remains disabled when the time range is invalid', () => {
  const handleSubmit = jest.fn();
  render(<UpdateStaffForTimeRangeForm ustd={staffData()} interval={60} handleSubmit={handleSubmit} cancelHandler={jest.fn()} />);

  fireEvent.change(screen.getByRole('start-time-select'), {target: {value: '01:00'}});
  const save = screen.getByRole('button', {name: 'Save staff updates'});
  expect(save).toBeDisabled();
  fireEvent.click(save);
  expect(handleSubmit).not.toHaveBeenCalled();
});
