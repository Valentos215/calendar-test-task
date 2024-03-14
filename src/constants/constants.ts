import { IBusyDate, IHoliday } from 'types/types';

export enum ETaskColor {
  GREEN = 'rgb(96, 190, 80)',
  BLUE = 'rgb(3, 120, 190)',
  YELLOW = 'rgb(242, 215, 0)',
  ORANGE = 'rgb(255, 171, 73)',
  AZURE = 'rgb(0, 195, 225)',
  PURPLE = 'rgb(195, 118, 224)',
}

export const Holidays: IHoliday[] = [
  {
    date: 8,
    month: 2,
    title: "International Women's Day",
  },
  {
    date: 14,
    month: 1,
    title: "Valentine's Day",
  },
  {
    date: 25,
    month: 11,
    title: 'Christmas',
  },
  {
    date: 31,
    month: 11,
    title: 'New Year’s Day',
  },
  {
    date: 1,
    month: 0,
    title: 'New Year’s Day',
  },
  {
    date: 8,
    month: 4,
    title: 'World Red Cross Day',
  },
  {
    date: 21,
    month: 11,
    title: 'Winter Solstice',
  },
  {
    date: 13,
    month: 11,
    title: 'St. Lucia Day',
  },
  {
    date: 31,
    month: 9,
    title: 'Halloween',
  },
  {
    date: 17,
    month: 2,
    title: 'St. Patrick’s Day',
  },
  {
    date: 1,
    month: 4,
    title: 'Labour Day',
  },
];

export const weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const exampleBusyDates: IBusyDate[] = [
  {
    date: 8,
    month: 2,
    year: 2024,
    tasks: [
      {
        title: 'Some things to do',
        color: ETaskColor.GREEN,
      },
    ],
  },
];
