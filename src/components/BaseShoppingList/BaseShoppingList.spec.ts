import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import BaseShoppingList from '@/components/BaseShoppingList/BaseShoppingList.vue';
import BaseShoppingListControls from '@/components/BaseShoppingListControls/BaseShoppingListControls.vue';
import BaseShoppingListItem from '@/components/BaseShoppingListItem/BaseShoppingListItem.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';
import { useShoppingListStore } from '@/stores';

describe('BaseShoppingList', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const shoppingListStore = useShoppingListStore();
  const { shoppingItems, addItem } = shoppingListStore;

  let wrapper: ComponentWrapperType<typeof BaseShoppingList>;

  const createComponent = () => {
    wrapper = mount(BaseShoppingList);
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render controls', () => {
    expect(wrapper.findComponent(BaseShoppingListControls).exists()).toBe(true);
  });

  it('should render only BaseEmptyListMessage component if no list items', () => {
    expect(wrapper.findComponent(BaseShoppingListItem).exists()).toBe(false);
    expect(wrapper.findComponent(BaseEmptyListMessage).exists()).toBe(true);
  });

  it('should render only BaseShoppingListItem component if has list items', async () => {
    addItem('test item');

    await nextTick();

    expect(wrapper.findComponent(BaseShoppingListItem).exists()).toBe(true);
    expect(wrapper.findComponent(BaseEmptyListMessage).exists()).toBe(false);
  });

  it('should sync local state list with store state list', () => {
    const input = wrapper.find('#shopping-item-name-input');

    input.setValue('new item');
    input.trigger('submit');
    input.setValue('new item 2');
    input.trigger('submit');

    expect(shoppingItems.length).toBe(3);
    expect(wrapper.vm.listItems.length).toBe(3);
  });

  it('should have grip element for drag n drop', () => {
    const el = wrapper.find('[data-test-id="shopping-item-grip"');

    expect(el.exists()).toBe(true);
  });
});
