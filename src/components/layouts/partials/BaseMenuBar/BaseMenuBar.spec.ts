import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { ref } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import BaseMenuBar from '@/components/layouts/partials/BaseMenuBar/BaseMenuBar.vue';
import BaseExpensesListControls from '@/components/BaseExpensesListControls/BaseExpensesListControls.vue';
import { useCalendarStore } from '@/stores';
import { nextTick } from 'vue';

const currentRoute = ref({ name: 'home' });

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => currentRoute),
  RouterLink: vi.fn(),
}));

describe('BaseMenuBar', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const calendarStore = useCalendarStore();

  const { initCalendar } = calendarStore;

  initCalendar();

  const wrapper = shallowMount(BaseMenuBar);

  it('should have menu items', () => {
    expect(wrapper.findAll('.menu__item').length).toBe(3);
  });

  it('should have BaseExpensesListControls component, if router home', () => {
    const controlsComponent = wrapper.findComponent(BaseExpensesListControls);

    expect(controlsComponent.exists()).toBe(true);
  });

  it('should have BaseExpensesListControls component, if router not home', async () => {
    currentRoute.value = { name: 'settings' };

    await nextTick();

    const controlsComponent = wrapper.findComponent(BaseExpensesListControls);

    expect(controlsComponent.exists()).toBe(false);
  });
});
