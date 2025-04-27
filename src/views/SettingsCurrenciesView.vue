<template>
  <h3>Choose default currency</h3>

  <div class="currencies">
    <BaseCurrencyItem
      v-for="currency in currencies"
      :key="currency.name"
      :id="currency.name"
      :label="currency.name"
      :value="currency.name"
      :is-selected="currency.isActive"
      :is-default="currency.isDefault"
      name="currencies"
    />
  </div>

  <h3>Add new currency</h3>

  <BaseCurrencyAddForm />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/stores';
import BaseCurrencyItem from '@/components/BaseCurrencyItem/BaseCurrencyItem.vue';
import BaseCurrencyAddForm from '@/components/forms/BaseCurrencyAddForm/BaseCurrencyAddForm.vue';

const settingsStore = useSettingsStore();

const { currencies } = storeToRefs(settingsStore);
</script>

<style scoped>
.currencies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
