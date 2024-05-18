<template>
  <header class="sticky top-0 w-full bg-white z-[100]">
    <div class="container mx-auto px-5 py-3 flex items-center justify-between select-none">
      <div class="flex items-center">
        <a href="/budget.it/" class="flex items-baseline font-bold">
          <div class="logo-gradient gradient-animation text-lg lg:text-2xl">budget.it</div>
          <sub class="logo-sub-gradient gradient-animation text-xs ml-2 bottom-0">
            v{{ version }}
          </sub>
        </a>
      </div>

      <a href="https://github.com/begprod/budget.it" target="_blank" class="select-none">
        <img
          src="@/assets/images/github-mark.svg"
          class="w-7 opacity-80 hover:opacity-100 transition-all duration-300"
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

<style scoped lang="scss">
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

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
