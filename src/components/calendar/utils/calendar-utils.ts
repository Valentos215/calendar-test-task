import moment, { Moment } from 'moment';
import { IBusyDate, ICalendarDate, IHoliday, ITask } from 'types/types';

const isSameDates = (date1: Moment, date2: Moment): boolean => {
  return (
    date1.date() === date2.date() &&
    date1.month() === date2.month() &&
    date1.year() === date2.year()
  );
};

export const findTasks = (busyDates: IBusyDate[], date: Moment): ITask[] => {
  const busyDate = busyDates.find(
    (d: IBusyDate) => d.date === date.date() && d.month === date.month() && d.year === date.year(),
  );
  return busyDate?.tasks || [];
};

export const findHoliday = (Holidays: IHoliday[], date: Moment): string | null => {
  const foundHoliday = Holidays.find(
    (h: IHoliday) => h.date === date.date() && h.month === date.month(),
  );
  return foundHoliday?.title || null;
};

export const createMonthlyCalendar = (
  selectedDate: Moment,
  busyDates: IBusyDate[],
  Holidays: IHoliday[],
): ICalendarDate[] => {
  const startOfMonth = selectedDate.clone().startOf('month');
  const endOfPrevMonth = startOfMonth.clone().subtract(1, 'day');
  const startOfFirstWeek = startOfMonth.clone().startOf('week');
  const endOfMonth = startOfMonth.clone().endOf('month');
  const endOfLastWeek = endOfMonth.clone().endOf('week');
  const startOfNextMonth = endOfMonth.clone().add(1, 'day');
  const calendar: ICalendarDate[] = [];
  const currentDate = startOfFirstWeek.clone();

  while (currentDate.isSameOrBefore(endOfLastWeek)) {
    //adding empty calendar cells to the array

    if (currentDate.isBefore(endOfPrevMonth) || currentDate.isAfter(startOfNextMonth)) {
      calendar.push({
        date: null,
        tasks: [],
        holidayTitle: null,
        isRelevant: false,
        isToday: false,
      });
    }

    //adding the filled calendar cells to the array

    if (currentDate.isSameOrAfter(endOfPrevMonth) && currentDate.isSameOrBefore(startOfNextMonth)) {
      const tasks = findTasks(busyDates, currentDate);

      calendar.push({
        date: currentDate.date(),
        tasks: tasks,
        holidayTitle: findHoliday(Holidays, currentDate),
        isRelevant: currentDate.isAfter(endOfPrevMonth) && currentDate.isBefore(endOfMonth),
        isToday: isSameDates(currentDate, moment()),
      });
    }

    currentDate.add(1, 'day');
  }
  return calendar;
};
