<template>
  <div class="empty-message">
    <slot name="icon" />
    <slot name="message" />
  </div>
</template>

<style scoped>
.empty-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  height: 2rem;
  color: var(--slate-500);
  font-size: clamp(var(--typo-size-xs), 1.56vw, var(--typo-size-base));
  user-select: none;
}
</style>
