import type { IDay, IMonth } from '@/types';
import { describe, it, expect } from 'vitest';
import { generateDays } from '@/helpers';

describe('generateDays', () => {
  const months: Array<IMonth> = [
    {
      id: '042024',
      name: 'April',
      monthString: new Date('2024-04-01'),
      isCurrent: true,
    },
  ];

  it('should generate days for given months', () => {
    const days: Array<IDay> = generateDays(months);

    expect(days.length).toBeGreaterThanOrEqual(30);
  });
});
