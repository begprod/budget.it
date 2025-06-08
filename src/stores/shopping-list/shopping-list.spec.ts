import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useShoppingListStore } from '@/stores';

describe('useShoppingListStore', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const shoppingStore = useShoppingListStore();
  const { shoppingItems } = storeToRefs(shoppingStore);
  const { addItem, markItemIsDone } = shoppingStore;

  it('should add item', () => {
    addItem('first');
    addItem('second');
    addItem('third');

    expect(shoppingItems.value[0].title).toEqual('third');
    expect(shoppingItems.value[0].isDone).toBeFalsy();
    expect(shoppingItems.value[1].title).equal('second');
    expect(shoppingItems.value[1].isDone).toBeFalsy();
    expect(shoppingItems.value[2].title).equal('first');
    expect(shoppingItems.value[2].isDone).toBeFalsy();
  });

  it('should update item is done', () => {
    markItemIsDone(shoppingItems.value[0].id, true);
    markItemIsDone(shoppingItems.value[1].id, false);
    markItemIsDone(shoppingItems.value[2].id, true);

    expect(shoppingItems.value[0].isDone).toBeTruthy();
    expect(shoppingItems.value[1].isDone).toBeFalsy();
    expect(shoppingItems.value[2].isDone).toBeTruthy();
  });
});
