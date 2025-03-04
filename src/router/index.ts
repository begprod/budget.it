import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '@/views/DashboardView.vue';
import SettingsView from '@/views/SettingsView.vue';
import ShoppingListView from '@/views/ShoppingListView.vue';

export const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/shopping-list',
      name: 'shopping-list',
      component: ShoppingListView,
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
