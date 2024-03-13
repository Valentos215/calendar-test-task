import { ETaskColor } from 'constants/constants';

export interface ITask {
  title: string;
  color: ETaskColor;
}

export interface IShortDate {
  date: number;
  month: number;
}

export interface IFullDate {
  date: number;
  month: number;
  year: number;
}

export interface IHoliday extends IShortDate {
  title: string;
}

export interface IBusyDate extends IFullDate {
  tasks: ITask[];
}

export interface ICalendarDate {
  date: number | null;
  tasks: ITask[];
  holidayTitle: string | null;
  isRelevant: boolean;
  isToDay: boolean;
}
