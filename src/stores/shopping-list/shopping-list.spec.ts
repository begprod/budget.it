import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useShoppingListStore } from '@/stores';

describe('useShoppingListStore', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const shoppingStore = useShoppingListStore();
  const { shoppingItems } = storeToRefs(shoppingStore);
  const { addItem, markItemIsDone, removeItem } = shoppingStore;

  it('should add item', () => {
    addItem({ id: '1', title: 'first', isDone: false });
    addItem({ id: '2', title: 'second', isDone: true });
    addItem({ id: '3', title: 'third', isDone: false });

    expect(shoppingItems.value[0].title).toEqual('first');
    expect(shoppingItems.value[0].isDone).toBeFalsy();
    expect(shoppingItems.value[1].title).equal('second');
    expect(shoppingItems.value[1].isDone).toBeTruthy();
    expect(shoppingItems.value[2].title).equal('third');
    expect(shoppingItems.value[2].isDone).toBeFalsy();
  });

  it('should update item is done', () => {
    markItemIsDone('1', true);
    markItemIsDone('2', false);
    markItemIsDone('3', true);

    expect(shoppingItems.value[0].isDone).toBeTruthy();
    expect(shoppingItems.value[1].isDone).toBeFalsy();
    expect(shoppingItems.value[2].isDone).toBeTruthy();
  });

  it('should remove item', () => {
    removeItem('1');
    removeItem('2');
    removeItem('3');

    expect(shoppingItems.value.length).toEqual(0);
  });
});
