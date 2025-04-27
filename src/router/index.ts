import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '@/views/DashboardView.vue';
import SettingsView from '@/views/SettingsView.vue';
import SettingsMenuView from '@/views/SettingsMenuView.vue';
import SettingsDailyBudgetView from '@/views/SettingsDailyBudgetView.vue';
import SettingsCurrenciesView from '@/views/SettingsCurrenciesView.vue';
import SettingsImportExportView from '@/views/SettingsImportExportView.vue';
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
      component: SettingsView,
      children: [
        {
          path: '',
          name: 'settings',
          component: SettingsMenuView,
        },
        {
          path: 'daily-budget',
          name: 'daily-budget',
          component: SettingsDailyBudgetView,
        },
        {
          path: 'currencies',
          name: 'currencies',
          component: SettingsCurrenciesView,
        },
        {
          path: 'import-export',
          name: 'import-export',
          component: SettingsImportExportView,
        },
      ],
    },
  ],
});
