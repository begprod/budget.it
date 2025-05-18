<template>
  <h3>Import/Export expenses data</h3>
  <h4 v-if="lastBackupDate" class="description">Last backup: {{ lastBackupDate }}</h4>

  <div class="exports-controls">
    <BaseButton @click="exportDataHandler()">
      <template #text> Export </template>
      <template #rightIcon>
        <FileUp class="icon icon_md" />
      </template>
    </BaseButton>
    <BaseButton @click="importDataHandler">
      <template #text> Import </template>
      <template #rightIcon>
        <FileDown class="icon icon_md" />
      </template>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { FileDown, FileUp } from 'lucide-vue-next';
import { exportDataFromLocalStorage, importDataToLocalStorage, getDateWithTime } from '@/helpers';
import { useCommonStore } from '@/stores';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

const commonStore = useCommonStore();

const { setToast, setLastBackupDate } = commonStore;
const { lastBackupDate } = storeToRefs(commonStore);

const exportDataHandler = () => {
  exportDataFromLocalStorage('budget.it:expenses');
  setLastBackupDate(getDateWithTime());
};

const importDataHandler = async () => {
  await importDataToLocalStorage('budget.it:expenses')
    .then(() => {
      setToast({
        type: 'success',
        message: 'Data imported successfully',
        duration: 5,
        callback: () => location.reload(),
      });

      setLastBackupDate(getDateWithTime());
    })
    .catch(() => {
      setToast({
        type: 'error',
        message: 'Something went wrong while importing data',
        duration: 5,
      });
    });
};
</script>

<style scoped>
.description {
  margin-bottom: 1rem;
  color: var(--color-typo-ghost);
  font-size: var(--typo-size-xs);
  font-weight: 300;
  opacity: 0.7;
  user-select: none;
}

.exports-controls {
  display: flex;
  gap: 0.6rem;
}
</style>
