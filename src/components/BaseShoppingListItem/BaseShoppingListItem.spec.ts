import type { ComponentWrapperType } from '@/types';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import BaseShoppingListItem from '@/components/BaseShoppingListItem/BaseShoppingListItem.vue';

describe('BaseShoppingListItem', () => {
  let wrapper: ComponentWrapperType<typeof BaseShoppingListItem>;

  const createComponent = () => {
    wrapper = shallowMount(BaseShoppingListItem, {
      props: {
        item: {
          id: '1',
          title: 'Item title',
          isDone: false,
        },
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain item title', () => {
    const title = wrapper.find('[data-test-id="shopping-item-title"]');

    expect(title.html()).toContain('Item title');
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

  it('should emit check when checkbox is change, and checbox has attr isChecked true', async () => {
    const checkbox = wrapper.find('[data-test-id="shopping-item-checkbox"');

    await checkbox.setValue(true);

    expect(wrapper.emitted()).toHaveProperty('check');
    expect(wrapper.emitted()['check']).toStrictEqual([['1', true]]);
  });

  it('should emit remove when press on remove button', async () => {
    const button = wrapper.find('[data-test-id="shopping-item-delete-button"]');

    await button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
    expect(wrapper.emitted()).toHaveProperty('remove');
    expect(wrapper.emitted()['remove']).toStrictEqual([['1']]);
  });
});
