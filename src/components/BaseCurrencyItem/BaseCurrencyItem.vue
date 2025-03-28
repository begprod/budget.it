<template>
  <div class="currency-item" :class="classes">
    <BaseRadioButton
      :id="id"
      :name="name"
      :label="label"
      :value="value"
      :checked="isSelected"
      class="currency-item__title"
      @change="setActiveCurrency(id)"
    />
    <BaseButton
      v-if="!isDefault"
      class="currency-item__button"
      title="delete currency"
      @click="deleteCurrency(id)"
      :is-disabled="isSelected"
    >
      <template #text>
        <X v-if="!isSelected" class="icon icon_sm" />
        <Lock v-if="isSelected" class="icon icon_sm" />
      </template>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { X, Lock } from 'lucide-vue-next';
import { useSettingsStore } from '@/stores';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseRadioButton from '@/components/ui/controls/BaseRadioButton/BaseRadioButton.vue';

interface IProps {
  id: string;
  name: string;
  label: string;
  value: string;
  isSelected: boolean;
  isDefault: boolean;
}

const props = defineProps<IProps>();

const settingsStore = useSettingsStore();
const { setActiveCurrency, deleteCurrency } = settingsStore;

const classes = computed(() => {
  return {
    'currency-item_custom': !props.isDefault,
  };
});
</script>

<style>
.currency-item {
  display: flex;
  align-items: center;

  .currency-item__button {
    padding-top: 0;
    padding-bottom: 0;
    height: 100%;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
}

.currency-item_custom {
  .currency-item__title {
    label {
      max-width: 8rem;
      border-right: none;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }
}
</style>
