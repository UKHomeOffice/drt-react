import React from "react";
import { render } from "../../TestProviderRenderer";
import { screen } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
import PortSelector from "../PortSelector";
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
  const selector = await screen.findByRole('combobox', {name: 'Select a location'});

  expect(selector).toHaveValue('/regional-dashboard');
})

test("it calls the handleChangePort function correctly", async () => {

  render(<PortSelector {...portSelectorProps}  />);
  const selector = await screen.findByRole('combobox', {name: 'Select a location'});
  fireEvent.change(selector, {target: {value: '/cwi'}});

  expect(portSelectorProps.handleChangePort).toHaveBeenCalledTimes(1);
  expect(portSelectorProps.handleChangePort).toHaveBeenCalledWith('/cwi');
})
