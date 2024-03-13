import { ETaskColor } from 'constants/constants';

export interface ITask {
  title: string;
  color: ETaskColor;
}

export interface IShortDate {
  day: number;
  month: number;
}

export interface IFullDate {
  day: number;
  month: number;
  year: number;
}

export interface IHoliday extends IShortDate {
  title: string;
}

export interface IBusyDay extends IFullDate {
  tasks: ITask[];
}

export interface ICalendarDay {
  day: number | null;
  tasks: ITask[];
  holidayTitle: string | null;
  isRelevant: boolean;
  isToday: boolean;
}
