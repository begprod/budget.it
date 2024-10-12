import { describe, it, expect } from 'vitest';
import { getDateWithTime } from '@/helpers';

describe('getDateWithTime', () => {
  it('should return time in 24-hour format', () => {
    const time = getDateWithTime(new Date('2024-04-01T10:33:00'));

    expect(time).toBe('1 April 24 at 10:33');
  });
});
