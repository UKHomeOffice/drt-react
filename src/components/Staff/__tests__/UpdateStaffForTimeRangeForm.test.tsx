import { addMinuteIfReduced } from '../UpdateStaffForTimeRangeForm';

describe('roundToNearestOption', () => {
  it('should round to the nearest 15 minutes', () => {
    expect(addMinuteIfReduced(2, 59)).toEqual({ hour: 3, minute: 0 });
    expect(addMinuteIfReduced(3, 0)).toEqual({ hour: 3, minute: 0 });
    expect(addMinuteIfReduced(2, 14)).toEqual({ hour: 2, minute: 15 });
    expect(addMinuteIfReduced(2, 15)).toEqual({ hour: 2, minute: 15 });
    expect(addMinuteIfReduced(2, 29)).toEqual({ hour: 2, minute: 30 });
    expect(addMinuteIfReduced(2, 30)).toEqual({ hour: 2, minute: 30 });
    expect(addMinuteIfReduced(2, 44)).toEqual({ hour: 2, minute: 45 });
    expect(addMinuteIfReduced(2, 45)).toEqual({ hour: 2, minute: 45 });
  });
});