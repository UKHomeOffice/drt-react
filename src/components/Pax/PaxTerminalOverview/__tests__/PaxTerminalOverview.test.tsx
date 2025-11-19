import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PaxTerminalOverview, IPaxTerminalOverview } from '../PaxTerminalOverview';

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => null
}));

describe('PaxTerminalOverview', () => {
  const queuePaxCounts = {
    from: '',
    to: '',
    egate: 1,
    eea: 1,
    noneea: 1,
  }
  const baseProps: IPaxTerminalOverview = {
    terminal: 'T1',
    desks: 10,
    staff: 15,
    flights: [],
    ragStatus: 'green',
    chartData: {
      labels: ['e-gate', 'EEA', 'Non-EEA'],
      datasets: [{
        data: [50, 30, 20],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800']
      }]
    },
    pressure: [],
    periodQueuePaxCounts: [
      queuePaxCounts,
      queuePaxCounts,
      queuePaxCounts,
    ],
    currentTime: '12:00'
  };

  it('should display "1 flight" when there is exactly one flight', () => {
    const props = {
      ...baseProps,
      flights: [{ id: 1, flightCode: 'BA123' }]
    };

    render(<PaxTerminalOverview {...props} />);

    expect(screen.getByTestId('terminal-flights')).toHaveTextContent('1 flight');
    expect(screen.getByTestId('terminal-flights')).not.toHaveTextContent('1 flights');
  });

  it('should display "2 flights" when there are multiple flights', () => {
    const props = {
      ...baseProps,
      flights: [
        { id: 1, flightCode: 'BA123' },
        { id: 2, flightCode: 'BA456' }
      ]
    };

    render(<PaxTerminalOverview {...props} />);

    expect(screen.getByTestId('terminal-flights')).toHaveTextContent('2 flights');
  });

  it('should display "0 flights" when there are no flights', () => {
    render(<PaxTerminalOverview {...baseProps} />);

    expect(screen.getByTestId('terminal-flights')).toHaveTextContent('0 flights');
  });
});
