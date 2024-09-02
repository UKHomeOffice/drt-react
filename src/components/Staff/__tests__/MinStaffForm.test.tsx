import { render, fireEvent, waitFor } from "@testing-library/react";
import { MinStaffForm } from "../MinStaffForm";
import React from "react";

describe("MinStaffForm", () => {
  const handleSubmitMock = jest.fn();
  const continueCallbackMock = jest.fn();

  const props = {
    port: "Port",
    terminal: "Terminal",
    minStaffNumber: 10,
    handleSubmit: handleSubmitMock,
    continueCallback: continueCallbackMock
  };

  it("renders min staff form correctly", () => {
    const { getByTestId } = render(<MinStaffForm {...props} />);
    expect(getByTestId('min-staff-form')).toBeInTheDocument();
  });

  it("handles min staff number submission with valid input", async () => {
    const { getByPlaceholderText, getByTestId } = render(<MinStaffForm {...props} />);
    const input = getByPlaceholderText("minimum number staff*");

    fireEvent.change(input, { target: { value: '20' } });
    fireEvent.click(getByTestId('min-staff-form-submit'));

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalledWith(20);
    });
  });

  it("shows error when min staff number is not a valid number", async () => {
    const { getByPlaceholderText, getByTestId } = render(<MinStaffForm {...props} />);
    const input = getByPlaceholderText("minimum number staff*");

    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.click(getByTestId('min-staff-form-submit'));

    await waitFor(() => {
      expect(getByTestId('min-staff-number-error')).toBeInTheDocument();
    });
  });

  it("shows error when min staff form submission fails", async () => {
    handleSubmitMock.mockImplementationOnce(() => { throw new Error(); });

    const { getByPlaceholderText, getByTestId } = render(<MinStaffForm {...props} />);
    const input = getByPlaceholderText("minimum number staff*");

    fireEvent.change(input, { target: { value: '20' } });
    fireEvent.click(getByTestId('min-staff-form-submit'));

    await waitFor(() => {
      expect(getByTestId('min-staff-submit-error')).toBeInTheDocument();
    });
  });
});
