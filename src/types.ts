import type { RemovableRef } from '@vueuse/core';
import { mount } from '@vue/test-utils';

export interface ICommonStore {
  lastCalendarUpdateDate: RemovableRef<string>;
  lastBackupDate: RemovableRef<string | null>;
  isAddExpenseInputVisible: boolean;
  toast: IToast;
}

export interface ICalendarStore {
  months: Array<IMonth>;
  days: Array<IDay>;
}

export interface IMonth {
  id: string;
  name: string;
  monthString: Date;
  isCurrent: boolean;
  isFuture: boolean;
}

export interface IDay {
  id: string;
  monthId: IMonth['id'];
  number: string;
  name: string;
  isCurrent: boolean;
  isFuture: boolean;
  isPast: boolean;
}

export interface IExpensesStore {
  expenses: RemovableRef<Record<string, Record<'items', Array<IExpense>>>>;
}

export interface IExpense {
  id: string;
  value: number | string;
  currency: string;
  createdAt: string;
  monthId: IMonth['id'];
  dayId: IDay['id'];
}

export interface ISettingsStore {
  currencies: RemovableRef<Array<ICurrency>>;
  dailyBudget: RemovableRef<number>;
  monthlyDailyBudget: RemovableRef<Record<string, { dailyBudget: number }>>;
}

export interface ICurrency {
  name: string;
  isActive: boolean;
  isDefault: boolean;
}

export interface IToast {
  type: 'success' | 'error' | 'default';
  message: string;
  duration: number;
  callback?: () => void;
}

const mountComponent = <T>(component: T) => mount(component);
export type ComponentWrapperType<T> = ReturnType<typeof mountComponent<T>>;
