import React from "react";
import { render } from "../../TestProviderRenderer";
import { screen, prettyDOM } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import PortSelector from "../PortSelector";
import { waitFor, within } from "@testing-library/react";
import '@testing-library/jest-dom'

const portSelectorProps = {
  options: [
    { label: 'National Dashboard', link: '/regional-dashboard' },
    { label: 'CWL (Cardiff)', link: '/cwi' }
  ],
  selectedOption: '/regional-dashboard',
  handleChangePort: jest.fn(),
}

test("it selects options based on the selectedOption prop", async () => {

  render(<PortSelector {...portSelectorProps}  />);
  const selector = await screen.getByTestId('port-selector-trigger');
  const trigger = within(selector).getByDisplayValue('/regional-dashboard');

  expect(trigger).toBeTruthy();
})

test("it calls the handleChangePort function correctly", async () => {

  const {container} = render(<PortSelector {...portSelectorProps}  />);
  const selectCompoEl = await screen.getByTestId('port-selector-trigger');
  const button = container.getElementsByClassName('MuiSelect-select')[0]
  await fireEvent.mouseDown(button);

  const listbox = within(screen.getByRole('presentation')).getByRole(
    'listbox'
  );
  const option = within(listbox).getByText('CWL (Cardiff)');//within(listbox).getByTestId('port-selector-/cwi')

  await fireEvent.click(option);

  expect(portSelectorProps.handleChangePort).toHaveBeenCalledTimes(1);
  expect(portSelectorProps.handleChangePort).toHaveBeenCalledWith('/cwi');
})
