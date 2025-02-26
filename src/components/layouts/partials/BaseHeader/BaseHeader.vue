<template>
  <header class="header">
    <div class="wrapper header__inner">
      <a href="/budget.it/" class="logo">
        <span class="logo-gradient gradient-animation logo__title">budget.it</span>
        <span class="logo-sub-gradient gradient-animation logo__subtitle"> v{{ version }} </span>
      </a>

      <a class="header__github" href="https://github.com/begprod/budget.it" target="_blank">
        <img
          src="@/assets/images/github-mark.svg"
          class="icon icon_xl"
          width="40"
          height="40"
          alt="budget.it github"
        />
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
// @ts-ignore
import { version } from '../../../../../package.json';
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--white);
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
  font-size: 0.75rem;
}

.header__github {
  user-select: none;
  opacity: 0.8;
  transition: 0.3s ease-in-out;
  transition-property: opacity, transform;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
}

.logo-gradient {
  background-color: #0093e9;
  background-image: linear-gradient(43deg, #85ffbd 0%, #0093e9 46%, #00dbde 100%);
  background-size: 400%;
  background-repeat: repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}

.logo-sub-gradient {
  background-color: #0093e9;
  background-image: linear-gradient(43deg, #00dbde 0%, #0093e9 46%, #85ffbd 100%);
  background-size: 400%;
  background-repeat: repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}

.gradient-animation {
  animation: gradient 15s ease-in-out infinite;
}
</style>
