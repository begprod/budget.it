<template>
  <header class="sticky top-0 w-full bg-white z-[100]">
    <div class="container mx-auto p-3 flex items-center justify-between">
      <div class="flex items-center">
        <a href="/todo.it/" class="flex items-baseline font-bold">
          <div class="logo-gradient gradient-animation text-2xl">budget.it</div>
          <sub class="logo-sub-gradient gradient-animation text-sm ml-2 bottom-0">
            v{{ version }}
          </sub>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// @ts-ignore
import { version } from '../../../../../package.json';
</script>

<style scoped lang="scss">
.logo-gradient {
  background-color: #0093E9;
  background-image: linear-gradient(43deg, #85FFBD 0%, #0093E9 46%, #00DBDE 100%);
  background-size: 400%;
  background-repeat: repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}

.logo-sub-gradient {
  background-color: #0093E9;
  background-image: linear-gradient(43deg, #00DBDE 0%, #0093E9 46%, #85FFBD 100%);
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
background-color: #0093E9;
background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
