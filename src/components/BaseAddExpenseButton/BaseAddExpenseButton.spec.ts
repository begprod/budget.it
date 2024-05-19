import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import BaseAddExpenseButton from '@/components/BaseAddExpenseButton/BaseAddExpenseButton.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

describe('BaseAddExpenseButton', () => {
  const wrapper = shallowMount(BaseAddExpenseButton, {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn,
      }),
    ],
  });

  it('should contain components', () => {
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });

  it('should call method "showExpenseInputHandler" on click button "Add expenses"', async () => {
    const showExpenseInputHandler = vi.spyOn(wrapper.vm, 'showExpenseInputHandler');

    await wrapper.find('[data-test-id="add-expense-button"]').trigger('click');

    expect(showExpenseInputHandler).toHaveBeenCalled();
  });
});
