<template>
  <div class="p-12">
    <p>3000 in {{ months[0].name }}</p>
    <small>43432 in last {{ months.length }} months</small>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCalendarStore } from '@/stores';

const calendarStore = useCalendarStore();
const { months } = storeToRefs(calendarStore);
</script>
