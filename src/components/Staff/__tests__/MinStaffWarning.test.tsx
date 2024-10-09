import { render, fireEvent } from "@testing-library/react";
import { MinStaffWarning } from "../MinStaffWarning";
import React from "react";

describe("MinStaffWarning", () => {
  const handleClickMock = jest.fn();

  const props = {
    message1: "Warning message 1",
    message2: "Warning message 2",
    minStaff: 10,
    handleClick: handleClickMock
  };

  it("renders correctly", () => {
    const { getByText } = render(<MinStaffWarning {...props} />);
    expect(getByText('Warning message 1 10')).toBeInTheDocument();
    expect(getByText('Warning message 2')).toBeInTheDocument();
    expect(getByText('+ Add minimum staff')).toBeInTheDocument();
  });

  it("handles button click", () => {
    const { getByTestId } = render(<MinStaffWarning {...props} />);
    const button = getByTestId('mobile-add-min-staff');

    fireEvent.click(button);

    expect(handleClickMock).toHaveBeenCalled();
  });
});
