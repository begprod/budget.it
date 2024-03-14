import type { RemovableRef } from '@vueuse/core';

export interface ICommonStore {
  lastCalendarUpdateDate: RemovableRef<string>;
  isAddExpenseInputVisible: boolean;
}

export interface ICalendarStore {
  months: Array<IMonth>;
  days: Array<IDay>;
  shouldGenerateNextMonth: boolean;
}

export interface IMonth {
  id: string;
  name: string;
  monthString: Date;
  isCurrent: boolean;
}

export interface IDay {
  id: string;
  monthId: IMonth['id'];
  number: string;
  name: string;
  isCurrent: boolean;
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
}

export interface ICurrency {
  name: string;
  isActive: boolean;
  isDefault: boolean;
}
