import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '@/views/DashboardView.vue';
import SettingsView from '@/views/SettingsView.vue';

export const router = createRouter({
  scrollBehavior: () => {
    const currentDayElement = document.getElementsByClassName('current-day')[0];

    if (currentDayElement) {
      currentDayElement.scrollIntoView({
        block: 'start',
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
});
