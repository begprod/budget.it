import type { ComponentWrapperType } from '@/types';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useCommonStore, useShoppingListStore } from '@/stores';
import ShoppingListControls from '@/components/BaseShoppingListControls/BaseShoppingListControls.vue';

describe('BaseExpensesListControls', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  let wrapper: ComponentWrapperType<typeof ShoppingListControls>;

  const commonStore = useCommonStore();
  const shoppingListStore = useShoppingListStore();

  vi.spyOn(commonStore, 'setToast');
  vi.spyOn(shoppingListStore, 'addItem');

  beforeEach(() => {
    wrapper = mount(ShoppingListControls);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render input and button', () => {
    expect(wrapper.find('[data-test-id="shopping-item-name-input"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('should add item on submit if title is valid', async () => {
    const input = wrapper.find('[data-test-id="shopping-item-name-input"]').find('input');
    await input.setValue('Milk');

    await wrapper.find('form').trigger('submit');

    expect(shoppingListStore.addItem).toHaveBeenCalledWith('Milk');
    expect(input.element.value).toBe('');
  });

  it('should show error toast if title not valid', async () => {
    await wrapper.find('form').trigger('submit.prevent');

    expect(commonStore.setToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'Item title can`t be empty',
      duration: 3,
    });

    expect(shoppingListStore.addItem).toHaveBeenCalledOnce();
  });
});
