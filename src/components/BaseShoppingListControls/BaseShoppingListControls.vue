<template>
  <div class="shopping-list-controls wrapper">
    <BaseFormBar @submit="submitItem">
      <template #input>
        <BaseInput
          v-model="newItemInput.title"
          id="shopping-item-name-input"
          type="text"
          placeholder="Enter item name"
          autocomplete="off"
          :is-error="newItemInput.isError"
          data-test-id="shopping-item-name-input"
        />
      </template>
      <template #button>
        <BaseButton type="submit">
          <template #text>
            <CornerRightDown class="icon icon_md" />
          </template>
        </BaseButton>
      </template>
    </BaseFormBar>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { string } from 'yup';
import { CornerRightDown } from 'lucide-vue-next';
import BaseFormBar from '@/components/BaseFormBar/BaseFormBar.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import { useCommonStore, useShoppingListStore } from '@/stores';

const commonStore = useCommonStore();
const shoppingListStore = useShoppingListStore();
const { setToast } = commonStore;
const { addItem } = shoppingListStore;

const newItemInput = reactive({
  title: '',
  isError: false,
});

const itemTitleSchema = string().required().min(1);

const submitItem = () => {
  try {
    itemTitleSchema.validateSync(newItemInput.title);

    newItemInput.isError = false;

    addItem(newItemInput.title);

    newItemInput.title = '';
  } catch {
    newItemInput.isError = true;

    setToast({ type: 'error', message: 'Item title can`t be empty', duration: 3 });
  }
};
</script>

<style scoped>
.shopping-list-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
