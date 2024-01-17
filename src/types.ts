import type { RemovableRef } from '@vueuse/core';

export interface ICalendarStore {
  months: Array<IMonth>;
  days: Array<IDay>;
  shouldGenerateNextMonth: boolean;
}

export interface ISettingsStore {
  currencies: RemovableRef<Array<string>>;
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
