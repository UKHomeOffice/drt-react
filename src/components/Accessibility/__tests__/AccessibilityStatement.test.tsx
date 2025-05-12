import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {AccessibilityStatement} from '../AccessibilityStatement';
import { within } from '@testing-library/react';

describe('AccessibilityStatement', () => {
  const mockProps = {
    accessibilityStatementUrl: 'https://example.com/accessibility',
    teamEmail: 'team@example.com',
    sendReportProblemGaEvent: jest.fn(),
    scrollSection: '',
  };

  it('renders the AccessibilityStatement component', () => {
    render(<AccessibilityStatement {...mockProps} />);

    // Check for the main heading
    expect(
      screen.getByRole('heading', {name: /Accessibility statement for Dynamic Response Tool \(DRT\)/i})
    ).toBeInTheDocument();

    // Check for the "In this page" section
    expect(screen.getByText(/In this page:/i)).toBeInTheDocument();

    // Check for the "Introduction" link
    expect(screen.getByRole('link', {name: /Introduction/i})).toHaveAttribute(
      'href',
      `${mockProps.accessibilityStatementUrl}/introduction`
    );

    // Check for the email button
    expect(screen.getByRole('link', {name: /Email us to report a problem/i})).toHaveAttribute(
      'href',
      `mailto:${mockProps.teamEmail}`
    );
  });

  it('checks for the "Feedback and contact information" section', () => {
    render(<AccessibilityStatement {...mockProps} />);

    // Narrow the scope to the specific section
    const feedbackSection = screen.getByRole('link', { name: /Feedback and contact information/i });
    expect(within(feedbackSection).getByText(/Feedback and contact information/i)).toBeInTheDocument();
  });

  it('calls sendReportProblemGaEvent when the email button is clicked', () => {
    render(<AccessibilityStatement {...mockProps} />);

    const emailButton = screen.getByRole('link', {name: /Email us to report a problem/i});
    emailButton.click();

    expect(mockProps.sendReportProblemGaEvent).toHaveBeenCalled();
  });

  it('scrolls to the correct section when scrollSection is provided', () => {
    const scrollMock = jest.fn();
    document.getElementById = jest.fn().mockReturnValue({
                                                          scrollIntoView: scrollMock,
                                                        });

    render(<AccessibilityStatement {...mockProps} scrollSection="feedback"/>);

    expect(document.getElementById).toHaveBeenCalledWith('feedback');
    expect(scrollMock).toHaveBeenCalledWith({behavior: 'smooth'});
  });
});