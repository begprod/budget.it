import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';
import BaseExpense from '@/components/BaseExpense/BaseExpense.vue';

vi.mock('@vueuse/core', () => ({
  usePointerSwipe: vi.fn(),
}));

describe('BaseExpense', () => {
  let wrapper: any;
  let mockUsePointerSwipe: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    const { usePointerSwipe } = await import('@vueuse/core');
    mockUsePointerSwipe = usePointerSwipe as ReturnType<typeof vi.fn>;

    const mockDistanceX = { value: 0 };

    mockUsePointerSwipe.mockImplementation(() => {
      return {
        distanceX: mockDistanceX,
      };
    });

    wrapper = mount(BaseExpense, {
      props: {
        value: '100',
        currency: 'USD',
        createdAt: '10:00',
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain the correct props', () => {
    expect(wrapper.props('value')).toBe('100');
    expect(wrapper.props('currency')).toBe('USD');
    expect(wrapper.props('createdAt')).toBe('10:00');
  });

  it('should emit delete-item when swipe threshold is passed', async () => {
    const distanceXRef = { value: 0 };
    let capturedOnSwipeEnd: (() => void) | null = null;

    mockUsePointerSwipe.mockImplementation((_: any, options: any) => {
      capturedOnSwipeEnd = options.onSwipeEnd;

      return {
        distanceX: distanceXRef,
      };
    });

    wrapper = mount(BaseExpense, {
      props: {
        value: '50',
        currency: 'EUR',
        createdAt: '12:00',
      },
    });

    const container = wrapper.find('.expense').element as HTMLElement;
    Object.defineProperty(container, 'offsetWidth', {
      value: 200,
      configurable: true,
    });

    distanceXRef.value = -120;

    expect(capturedOnSwipeEnd).toBeDefined();

    capturedOnSwipeEnd!();

    await new Promise((resolve) => setTimeout(resolve, 250));

    expect(wrapper.emitted('delete-item')).toBeDefined();
    expect(wrapper.emitted('delete-item')[0]).toEqual([]);
  });

  it('should NOT emit delete-item when swipe is below threshold', async () => {
    const distanceXRef = { value: 0 };
    let capturedOnSwipeEnd: (() => void) | null = null;

    mockUsePointerSwipe.mockImplementation((_: any, options: any) => {
      capturedOnSwipeEnd = options.onSwipeEnd;

      return {
        distanceX: distanceXRef,
      };
    });

    wrapper = shallowMount(BaseExpense, {
      props: {
        value: '50',
        currency: 'EUR',
        createdAt: '12:00',
      },
    });

    const container = wrapper.find('.expense').element as HTMLElement;
    Object.defineProperty(container, 'offsetWidth', {
      value: 200,
      configurable: true,
    });

    distanceXRef.value = -60;

    expect(capturedOnSwipeEnd).toBeDefined();

    capturedOnSwipeEnd!();

    await new Promise((resolve) => setTimeout(resolve, 250));

    expect(wrapper.emitted('delete-item')).toBeUndefined();
  });

  it('should emit delete-item when swipe is exactly at threshold (50%)', async () => {
    const distanceX = { value: 0 };
    let onSwipeEnd: (() => void) | null = null;

    mockUsePointerSwipe.mockImplementation((_target: any, options: any) => {
      onSwipeEnd = options.onSwipeEnd ?? null;
      return { distanceX };
    });

    wrapper = shallowMount(BaseExpense, {
      props: {
        value: '50',
        currency: 'EUR',
        createdAt: '12:00',
      },
    });

    const container = wrapper.find('.expense').element as HTMLElement;
    Object.defineProperty(container, 'offsetWidth', {
      value: 200,
      configurable: true,
    });

    // Свайп ровно на 50% — порог пройден (>= 0.5)
    distanceX.value = -100;
    onSwipeEnd!();

    await new Promise((resolve) => setTimeout(resolve, 250));

    expect(wrapper.emitted('delete-item')).toBeDefined();
  });

  it('should NOT emit delete-item when swipe is just below threshold', async () => {
    const distanceX = { value: 0 };
    let onSwipeEnd: (() => void) | null = null;

    mockUsePointerSwipe.mockImplementation((_target: any, options: any) => {
      onSwipeEnd = options.onSwipeEnd ?? null;
      return { distanceX };
    });

    wrapper = shallowMount(BaseExpense, {
      props: {
        value: '50',
        currency: 'EUR',
        createdAt: '12:00',
      },
    });

    const container = wrapper.find('.expense').element as HTMLElement;
    Object.defineProperty(container, 'offsetWidth', {
      value: 200,
      configurable: true,
    });

    // Свайп на 49.5% — порог не пройден
    distanceX.value = -99;
    onSwipeEnd!();

    await new Promise((resolve) => setTimeout(resolve, 250));

    expect(wrapper.emitted('delete-item')).toBeUndefined();
  });
});
