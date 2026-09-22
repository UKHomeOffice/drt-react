import React from "react";
import { Select, SelectOption } from '../govuk/Select';
import { MenuItem as MenuItemType } from "./Header";
import './PortSelector.scss';

export interface IPortSelector {
  handleChangePort: (path: string) => void,
  options: MenuItemType[],
  selectedOption: string,
}

const PortSelector = ({handleChangePort, options, selectedOption}: IPortSelector) => {
  const selectOptions: SelectOption[] = [
    {value: '', label: 'Select a location...', disabled: true},
    ...options.map(({label, link}) => ({value: link, label})),
  ];

  return (
    <div className="drt-port-selector-container">
      <Select
        name="port-selector"
        ariaLabel="Select a location"
        className="drt-port-selector"
        value={selectedOption}
        onChange={handleChangePort}
        options={selectOptions}
      />
    </div>
  )
}
export default PortSelector
