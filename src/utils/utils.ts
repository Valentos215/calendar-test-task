import { Moment } from 'moment';
import { IHoliday, IHolidaysResponse } from 'types/types';

export const sliceText = (text: string, length: number): string => {
  if (text.length > length) return text.slice(0, length) + '...';
  return text;
};

export const getHolidays = (selectedDate: Moment, respHolidays: IHolidaysResponse): IHoliday[] => {
  return respHolidays.map((respHoliday) => {
    const date = parseInt(respHoliday.date.split('-')[2]);
    const month = parseInt(respHoliday.date.split('-')[1]) - 1;
    return { date: date, month: month, title: respHoliday.name };
  });
};
