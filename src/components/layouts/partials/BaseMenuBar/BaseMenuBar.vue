<template>
  <div class="menu-bar">
    <Transition name="slide-up">
      <div v-if="route.name === 'home' && getMonthByIndex && isMounted">
        <BaseExpensesListControls />
      </div>
    </Transition>

    <div class="menu">
      <div class="menu__inner">
        <RouterLink :to="{ name: 'shopping-list' }" class="menu__item">
          <ShoppingBasket v-if="route.name !== 'shopping-list'" class="icon icon_lg" />

          <Transition>
            <ShoppingBasket
              v-if="route.name === 'shopping-list' && isMounted"
              class="icon icon_lg"
            />
          </Transition>

          <Transition>
            <span v-if="route.name === 'shopping-list' && isMounted">Shopping list</span>
          </Transition>
        </RouterLink>
        <RouterLink :to="{ name: 'home' }" class="menu__item">
          <Wallet v-if="route.name !== 'home'" class="icon icon_lg" />

          <Transition>
            <Wallet v-if="route.name === 'home' && isMounted" class="icon icon_lg" />
          </Transition>

          <Transition>
            <span v-if="route.name === 'home' && isMounted">Expenses</span>
          </Transition>
        </RouterLink>
        <RouterLink :to="{ name: 'settings' }" class="menu__item">
          <Settings v-if="!route.path.startsWith('/settings')" class="icon icon_lg" />

          <Transition>
            <Settings v-if="route.path.startsWith('/settings') && isMounted" class="icon icon_lg" />
          </Transition>

          <Transition>
            <span v-if="route.path.startsWith('/settings') && isMounted">Settings</span>
          </Transition>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Wallet, Settings, ShoppingBasket } from 'lucide-vue-next';
import { useCalendarStore } from '@/stores';
import BaseExpensesListControls from '@/components/BaseExpensesListControls/BaseExpensesListControls.vue';

const route = useRoute();
const isMounted = ref(false);

const calendarStore = useCalendarStore();
const { getMonthByIndex } = storeToRefs(calendarStore);

onMounted(() => {
  isMounted.value = true;
});
</script>

<style scoped>
.menu-bar {
  position: fixed;
  right: 0;
  bottom: 2lvh;
  left: 0;
  width: 100%;
  max-width: 425px;
  margin: 0 auto;
  padding: 0 1.25rem;
  z-index: 100;
}

.menu {
  padding: 0.25rem;
  background: var(--color-bg-surface-glass);
  box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: var(--rounded-lg);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  overflow: hidden;
}

.menu__inner {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

.menu__item {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem;
  font-size: var(--typo-size-sm);
  border-radius: var(--rounded-lg);
  color: var(--color-typo-primary);

  svg {
    opacity: 0.5;
  }
}

.router-link-exact-active,
.router-link-active {
  background-color: var(--color-bg-surface-secondary);

  svg {
    opacity: 1;
  }
}
</style>
