<template>
  <nav class="menu">
    <ul class="menu__wrapper">
      <li class="menu__item">
        <RouterLink :to="{ name: 'daily-budget' }" class="menu__link">
          <div class="menu__text-holder">
            <div class="menu__icon">
              <HandCoins class="icon icon_lg" />
            </div>
            <span>Daily budget</span>
          </div>

          <ChevronRight class="icon icon_md" />
        </RouterLink>
      </li>
      <li class="menu__item">
        <RouterLink :to="{ name: 'currencies' }" class="menu__link">
          <div class="menu__text-holder">
            <div class="menu__icon">
              <DollarSign class="icon icon_lg" />
            </div>
            <span>Currencies</span>
          </div>

          <ChevronRight class="icon icon_md" />
        </RouterLink>
      </li>
      <li class="menu__item">
        <RouterLink :to="{ name: 'import-export' }" class="menu__link">
          <div class="menu__text-holder">
            <div class="menu__icon">
              <FileUp class="icon icon_lg" />
            </div>
            <span href="#">Import/Export data</span>
          </div>

          <ChevronRight class="icon icon_md" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { FileUp, ChevronRight, HandCoins, DollarSign } from 'lucide-vue-next';
</script>

<style scoped>
.menu__wrapper {
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu__item {
  border-bottom: 1px solid var(--color-bg-surface-secondary);

  &:last-child {
    border-bottom: none;
  }
}

.menu__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  color: var(--color-typo-primary);
}

.menu__text-holder {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.menu__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: var(--rounded-xs);
  border: 1px solid var(--color-bg-border);
}
</style>
