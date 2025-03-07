import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
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
  const { addItem } = shoppingListStore;

  let wrapper: ComponentWrapperType<typeof BaseShoppingList>;

  const createComponent = () => {
    wrapper = shallowMount(BaseShoppingList);
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
});
