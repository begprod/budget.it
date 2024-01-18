<template>
  <div class="inline-flex px-3 py-[2px] rounded-2xl bg-sky-400 text-sm text-white">{{ label }}</div>
</template>

<script setup lang="ts">
interface IProps {
  label: string;
}

defineProps<IProps>();
</script>
