import { mount } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import BaseShoppingListItem from '@/components/BaseShoppingListItem/BaseShoppingListItem.vue';

vi.mock('@vueuse/core', () => ({
  usePointerSwipe: vi.fn(),
}));

describe('ShoppingItem', () => {
  let wrapper: any;
  let mockUsePointerSwipe: any;

  beforeEach(async () => {
    const { usePointerSwipe } = await import('@vueuse/core');
    mockUsePointerSwipe = usePointerSwipe as any;

    const mockDistanceX = { value: 0 };

    mockUsePointerSwipe.mockImplementation(() => {
      return {
        distanceX: mockDistanceX,
      };
    });

    wrapper = mount(BaseShoppingListItem, {
      props: {
        item: {
          id: 'test-id',
          title: 'Test Item',
          isDone: false,
        },
      },
    });
  });

  it('should contain item title', () => {
    const title = wrapper.find('[data-test-id="shopping-item-title"]');

    expect(title.text()).toContain('Test Item');
  });

  it('should has check class if item is checked', async () => {
    await wrapper.setProps({
      item: {
        id: '2',
        title: 'Item',
        isDone: true,
      },
    });

    expect(wrapper.attributes().class).toEqual('shopping-item shopping-item_checked');
  });

  it('should emit check when checkbox is change, and checkbox has attr isChecked true', async () => {
    const checkbox = wrapper.find('[data-test-id="shopping-item-checkbox"');

    await checkbox.setValue(true);

    expect(wrapper.emitted()).toHaveProperty('check');
    expect(wrapper.emitted()['check']).toStrictEqual([['test-id', true]]);
  });

  it('should emit remove when swipe threshold is passed', async () => {
    const distanceXRef = { value: 0 };
    let capturedOnSwipeEnd: (() => void) | null = null;

    mockUsePointerSwipe.mockImplementation((_: any, options: any) => {
      capturedOnSwipeEnd = options.onSwipeEnd;
      return {
        distanceX: distanceXRef,
      };
    });

    wrapper = mount(BaseShoppingListItem, {
      props: {
        item: {
          id: 'test-id-new',
          title: 'new item',
          isDone: true,
        },
      },
    });

    const container = wrapper.find('.shopping-item').element as HTMLElement;
    Object.defineProperty(container, 'offsetWidth', {
      value: 200,
      configurable: true,
    });

    // Симулируем свайп влево на 60% ширины (больше порога в 50%)
    distanceXRef.value = -120; // 120px из 200px = 60%

    // Проверяем, что onSwipeEnd был захвачен
    expect(capturedOnSwipeEnd).toBeDefined();

    capturedOnSwipeEnd!();

    await new Promise((resolve) => setTimeout(resolve, 250));

    expect(wrapper.emitted('remove')[0]).toEqual(['test-id-new']);
  });
});
