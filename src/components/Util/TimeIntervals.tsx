function timesBy15Minutes(interval: number): string[] {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute <= 45; minute += interval) {
      times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  }
  return times;
}

export const intervalStartTimeOptions: (interval: number) => string[] = (interval: number) => timesBy15Minutes(interval);

function timesBy15MinutesWithEnd(interval: number): string[] {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute <= 45; minute += interval) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      if (time !== '00:00') {
        times.push(time);
      }
    }
  }
  times.push('00:00');
  return times;
}

export const intervalEndTimeOptions: (interval: number) => string[] = (interval: number) => timesBy15MinutesWithEnd(interval);
