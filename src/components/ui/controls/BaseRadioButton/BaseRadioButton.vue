<template>
  <div>
    <input
      :id="id"
      :name="name"
      :value="value"
      :checked="checked"
      type="radio"
      class="hidden peer/radio"
      @change="changeHandler"
    />
    <label
      :for="id"
      :class="additionalClasses"
      class="block px-3 py-1 text-sm text-slate-400 border border-slate-300 rounded-2xl peer-checked/radio:text-white peer-checked/radio:bg-sky-400 select-none"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  checked: boolean;
  additionalClasses?: string | Object;
}

defineProps<Props>();

const emit = defineEmits(['change']);

const changeHandler = (event: Event) => {
  emit('change', (event.target as HTMLInputElement).value);
};
</script>
