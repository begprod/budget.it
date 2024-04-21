import { describe, it, expect } from 'vitest';
import { getTime } from '@/helpers';

describe('getTime', () => {
  it('should return time in 24-hour format', () => {
    const time = getTime(new Date('2024-04-01T10:33:00'));

    expect(time).toBe('10:33');
  });
});
