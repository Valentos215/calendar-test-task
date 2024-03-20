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
  if (busyDates.length) {
    const foundBusyDate = busyDates.find(
      (d: IBusyDate) =>
        d.date === date.date() && d.month === date.month() && d.year === date.year(),
    );
    if (!!foundBusyDate) return foundBusyDate.tasks;
  }
  return [];
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
    if (currentDate.isBefore(endOfPrevMonth) || currentDate.isAfter(startOfNextMonth)) {
      //adding empty calendar cells to the array

      calendar.push({
        date: null,
        tasks: [],
        holidayTitle: null,
        isRelevant: false,
        isToday: false,
      });
    }

    if (currentDate.isSameOrAfter(endOfPrevMonth) && currentDate.isSameOrBefore(startOfNextMonth)) {
      const tasks = findTasks(busyDates, currentDate);

      //adding the filled calendar cells to the array

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

export const filterBusyDates = (busyDates: IBusyDate[], filter: string): IBusyDate[] => {
  if (!filter) {
    return busyDates;
  }

  return busyDates.map((busyDate) => {
    const filteredTasks = busyDate.tasks.filter(
      (task) => task.title.toUpperCase().indexOf(filter.toUpperCase()) >= 0,
    );

    return { ...busyDate, tasks: filteredTasks };
  });
};
