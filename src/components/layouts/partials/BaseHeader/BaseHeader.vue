<template>
  <header class="header">
    <div class="wrapper header__inner">
      <a href="/budget.it/" class="logo">
        <span class="logo-gradient gradient-animation logo__title" data-test-id="name">
          {{ name }}
        </span>
        <span class="logo__subtitle" data-test-id="version"> v{{ version }} </span>
      </a>

      <a
        class="header__github"
        href="https://github.com/begprod/budget.it"
        target="_blank"
        data-test-id="github-link"
      >
        <img
          src="@/assets/images/github-mark.svg"
          class="icon icon_lg"
          width="35"
          height="35"
          alt="budget.it github"
        />
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { name, version } from '../../../../../package.json';
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--color-bg-surface-glass);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 100;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  user-select: none;
}

.logo {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-weight: 700;
}

.logo__title {
  font-size: clamp(var(--typo-size-lg), 2.34vw, var(--typo-size-2xl));
}

.logo__subtitle {
  font-size: var(--typo-size-xs);
  color: var(--color-typo-brand);
}

.header__github {
  opacity: 0.8;
  user-select: none;
  transition: 0.3s ease-in-out;
  transition-property: opacity, transform;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
}

.logo-gradient {
  background-color: #54a582;
  background-image: linear-gradient(45deg, #54a582 0%, #edf491 50%, #54a582 100%);
  background-size: 400%;
  background-repeat: repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}

.gradient-animation {
  animation: gradient 20s ease-in-out infinite;
}
</style>
