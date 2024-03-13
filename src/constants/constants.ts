import { IHoliday } from 'types/types';

export enum ETaskColor {
  Green = 'rgb(96, 190, 80)',
  Blue = 'rgb(3, 120, 190)',
  Yellow = 'rgb(242, 215, 0)',
  Orange = 'rgb(255, 171, 73)',
  Azure = 'rgb(0, 195, 225)',
  Purple = 'rgb(195, 118, 224)',
  Gray = 'rgb(148, 148, 148)',
}

export const holidays: IHoliday[] = [
  {
    day: 8,
    month: 2,
    title: "International Women's Day",
  },
  {
    day: 14,
    month: 1,
    title: "Valentine's Day",
  },
  {
    day: 25,
    month: 11,
    title: 'Christmas',
  },
  {
    day: 31,
    month: 11,
    title: 'New Year’s Day',
  },
  {
    day: 1,
    month: 0,
    title: 'New Year’s Day',
  },
  {
    day: 8,
    month: 4,
    title: 'World Red Cross Day',
  },
  {
    day: 21,
    month: 11,
    title: 'Winter Solstice',
  },
  {
    day: 13,
    month: 11,
    title: 'St. Lucia Day',
  },
  {
    day: 31,
    month: 9,
    title: 'Halloween',
  },
  {
    day: 17,
    month: 2,
    title: 'St. Patrick’s Day',
  },
  {
    day: 1,
    month: 4,
    title: 'Labour Day',
  },
];
