import {render, fireEvent, screen, waitFor, getByLabelText} from "@testing-library/react";
import { MinStaffForm } from "../MinStaffForm";
import React from "react";

describe("MinStaffForm", () => {
  const handleSubmitMock = jest.fn();
  const cancelHandlerMock = jest.fn();
  const handleInputChangeMock = jest.fn();

  const props = {
    port: "Port",
    terminal: "Terminal",
    message: "Message",
    minStaffNumber: 10,
    handleSubmit: handleSubmitMock,
    cancelHandler: cancelHandlerMock,
    handleInputChange: handleInputChangeMock

  };

  it("renders min staff form correctly", () => {
    const { getByTestId } = render(<MinStaffForm {...props} />);
    expect(getByTestId('min-staff-form')).toBeInTheDocument();
  });

  it("handles min staff number submission with valid input", async () => {
    render(<MinStaffForm {...props} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, {target: {value: '20'}});

    fireEvent.click(screen.getByTestId('min-staff-form-submit'));

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalledWith(20);
    });
  });

  it("shows error when min staff form submission fails", async () => {
    handleSubmitMock.mockImplementationOnce(() => {
      throw new Error();
    });

    const {getByTestId} = render(<MinStaffForm {...props} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, {target: {value: '20'}});
    fireEvent.click(getByTestId('min-staff-form-submit'));

    await waitFor(() => {
      expect(getByTestId('min-staff-submit-error')).toBeInTheDocument();
    });
  });
});
