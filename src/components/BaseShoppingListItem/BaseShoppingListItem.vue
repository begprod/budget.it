<template>
  <div class="shopping-item" :class="classes">
    <label :for="item.id" class="shopping-item__checkbox">
      <input
        :id="item.id"
        v-model="isChecked"
        type="checkbox"
        data-test-id="shopping-item-checkbox"
      />

      <div class="shopping-item__checkbox-icon">
        <SquareDashed class="icon icon_lg" />
        <CheckCheck class="icon icon_lg" />
      </div>
    </label>

    <div class="shopping-item__title" data-test-id="shopping-item-title">
      {{ item.title }}
    </div>

    <div class="shopping-item__controls">
      <BaseButton @click="$emit('remove', item.id)" data-test-id="shopping-item-delete-button">
        <template #text>
          <Trash2 class="icon icon_sm" />
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IShoppingItem } from '@/types';
import { computed } from 'vue';
import { Trash2, SquareDashed, CheckCheck } from 'lucide-vue-next';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

interface IProps {
  item: IShoppingItem;
}

const props = defineProps<IProps>();

const emit = defineEmits(['check', 'remove']);

const isChecked = computed({
  get: () => props.item.isDone,
  set: (value) => {
    emit('check', props.item.id, value);
  },
});

const classes = computed(() => {
  return {
    'shopping-item_checked': isChecked.value,
  };
});
</script>

<style scoped>
.shopping-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.875rem, 1.56vw, 1rem);
  width: 100%;
  padding: clamp(0.4rem, 1.56vw, 1rem);
  border: 1px solid var(--slate-200);
  border-radius: 0.6rem;
  box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  opacity: 1;
  transition: all 0.3s ease-in-out;
}

.shopping-item_checked {
  opacity: 0.3;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
}

.shopping-item__checkbox {
  position: relative;
  flex-shrink: 0;
  cursor: pointer;

  input {
    position: absolute;
    visibility: hidden;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;

    &:checked {
      ~ .shopping-item__checkbox-icon {
        svg:first-child {
          opacity: 0;
        }

        svg:nth-child(2) {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
}

.shopping-item__checkbox-icon {
  svg {
    color: var(--slate-400);
    transition: 0.3s ease-in-out;
    transition-property: opacity;
  }

  svg:first-child {
    opacity: 1;
  }

  svg:nth-child(2) {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    opacity: 0;
  }
}

.shopping-item__title {
  flex-grow: 1;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: clamp(var(--typo-size-sm), 1.56vw, var(--typo-size-base));
  text-align: left;
  overflow: hidden;
}

.shopping-item__controls {
  flex-shrink: 0;
}
</style>
