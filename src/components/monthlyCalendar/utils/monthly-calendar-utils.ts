import moment, { Moment } from 'moment';
import { IBusyDate, ICalendarDate, IHoliday, ITask } from 'types/types';

const isToday = (date: Moment): boolean => {
  return (
    date.date() === moment().date() &&
    date.month() === moment().month() &&
    date.year() === moment().year()
  );
};

const findTasks = (busyDates: IBusyDate[], date: Moment): ITask[] => {
  const busyDate = busyDates.find(
    ((d: IBusyDate) => d.date === date.date()) &&
      ((d: IBusyDate) => d.month === date.month()) &&
      ((d: IBusyDate) => d.year === date.year()),
  );
  return busyDate?.tasks || [];
};

const findHoliday = (Holidays: IHoliday[], date: Moment): string | null => {
  const foundHoliday = Holidays.find(
    (h: IHoliday) => h.date === date.date() && h.month === date.month(),
  );
  return foundHoliday?.title || null;
};

export const createMonthlyCalendar = (
  month: number,
  year: number,
  busyDates: IBusyDate[],
  Holidays: IHoliday[],
): ICalendarDate[] => {
  const startOfMonth = moment(`1.${month + 1}.${year}`, 'D.M.YYYY');
  const endOfPrevMonth = startOfMonth.clone().subtract(1, 'day');
  const startOfFirstWeek = startOfMonth.clone().startOf('week');
  const endOfMonth = startOfMonth.clone().endOf('month');
  const endOfLastWeek = endOfMonth.clone().endOf('week');
  const startOfNextMonth = endOfMonth.clone().add(1, 'day');
  const calendar: ICalendarDate[] = [];
  const currentDate = startOfFirstWeek.clone();

  while (currentDate.isSameOrBefore(endOfLastWeek)) {
    if (currentDate.isBefore(endOfPrevMonth) || currentDate.isAfter(startOfNextMonth)) {
      calendar.push({
        date: null,
        tasks: [],
        holidayTitle: null,
        isRelevant: false,
        isToDay: false,
      });
    }

    if (currentDate.isSameOrAfter(endOfPrevMonth) && currentDate.isSameOrBefore(startOfNextMonth)) {
      const tasks = findTasks(busyDates, currentDate);

      calendar.push({
        date: currentDate.date(),
        tasks: tasks,
        holidayTitle: findHoliday(Holidays, currentDate),
        isRelevant: currentDate.isAfter(endOfPrevMonth) && currentDate.isBefore(endOfMonth),
        isToDay: isToday(currentDate),
      });
    }

    currentDate.add(1, 'day');
  }
  return calendar;
};
