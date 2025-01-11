<template>
  <div class="flex items-center">
    <BaseRadioButton
      :id="id"
      :name="name"
      :label="label"
      :value="value"
      :checked="isSelected"
      :additional-classes="[
        classes,
        'max-w-30',
        'rounded-r-none',
        'overflow-hidden',
        'whitespace-nowrap',
        'text-ellipsis',
      ]"
      @change="setActiveCurrency(id)"
    />
    <BaseButton
      v-if="!isDefault"
      class="grow-0 !py-0 h-full rounded-l-none"
      title="delete currency"
      @click="deleteCurrency(id)"
      :is-disabled="isSelected"
    >
      <template #text>
        <X v-if="!isSelected" class="w-4 h-4" />
        <Lock v-if="isSelected" class="w-4 h-4 text-slate-950" />
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
    '!rounded-r-2xl': props.isDefault,
    'border-r-0': !props.isDefault,
  };
});
</script>
