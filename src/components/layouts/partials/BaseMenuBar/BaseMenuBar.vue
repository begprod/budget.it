<template>
  <div class="menu-bar">
    <template v-if="route.name === 'home' && getMonthByIndex">
      <BaseExpensesListControls />
    </template>

    <div class="menu">
      <div class="menu__inner">
        <RouterLink :to="{ name: 'shopping-list' }" class="menu__item">
          <ShoppingBasket class="icon icon_lg" />
        </RouterLink>
        <RouterLink :to="{ name: 'home' }" class="menu__item">
          <Wallet class="icon icon_lg" />
        </RouterLink>
        <!-- <RouterLink to="/dashboard" class="menu__item">
        <ChartLine class="icon icon_lg" />
      </RouterLink> -->
        <RouterLink :to="{ name: 'settings' }" class="menu__item">
          <Settings class="icon icon_lg" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Wallet, Settings, ShoppingBasket } from 'lucide-vue-next';
import { useCalendarStore } from '@/stores';
import BaseExpensesListControls from '@/components/BaseExpensesListControls/BaseExpensesListControls.vue';

const route = useRoute();

const calendarStore = useCalendarStore();
const { getMonthByIndex } = storeToRefs(calendarStore);
</script>

<style scoped>
.menu-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.menu {
  padding: 1.25rem;
  border-top: 1px solid var(--slate-200);
  background-color: var(--white);
}

.menu__inner {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 24rem;
}

.menu__item {
  svg {
    color: var(--slate-300);
  }
}

.router-link-exact-active {
  svg {
    color: var(--slate-900);
  }
}
</style>
