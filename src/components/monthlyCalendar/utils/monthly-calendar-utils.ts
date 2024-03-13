import moment, { Moment } from 'moment';
import { IBusyDay, ICalendarDay, IHoliday, ITask } from 'types/types';

const findTasks = (busyDays: IBusyDay[], date: Moment): ITask[] => {
  const busyDay = busyDays.find(
    ((d: IBusyDay) => d.day === date.day()) &&
      ((d: IBusyDay) => d.month === date.month()) &&
      ((d: IBusyDay) => d.year === date.year()),
  );
  return busyDay?.tasks || [];
};

const findHoliday = (holidays: IHoliday[], date: Moment): string | null => {
  const foundHoliday = holidays.find(
    ((h: IHoliday) => h.day === date.day()) && ((h: IHoliday) => h.month === date.month()),
  );
  return foundHoliday?.title || null;
};

export const createMonthlyCalendar = (
  month: number,
  year: number,
  busyDays: IBusyDay[],
  holidays: IHoliday[],
): ICalendarDay[] => {
  const startOfMonth = moment(`1.${month}.${year}`, 'D.M.YYYY');
  const endOfPrevMonth = startOfMonth.clone().subtract(1, 'day');
  const startOfFirstWeek = startOfMonth.clone().startOf('week');
  const endOfMonth = startOfMonth.clone().endOf('month');
  const endOfLastWeek = endOfMonth.clone().endOf('week');
  const startOfNextMonth = endOfMonth.clone().add(1, 'day');
  const calendar: ICalendarDay[] = [];
  const currentDate = startOfFirstWeek.clone();

  while (currentDate.isBefore(endOfLastWeek)) {
    if (currentDate.isBefore(endOfPrevMonth) && currentDate.isAfter(startOfNextMonth)) {
      calendar.push({
        day: null,
        tasks: [],
        holidayTitle: null,
        isRelevant: false,
        isToday: false,
      });
    }

    if (currentDate.isSameOrAfter(endOfPrevMonth) && currentDate.isSameOrBefore(startOfNextMonth)) {
      const tasks = findTasks(busyDays, currentDate);

      calendar.push({
        day: currentDate.day(),
        tasks: tasks,
        holidayTitle: findHoliday(holidays, currentDate),
        isRelevant: currentDate.isAfter(endOfPrevMonth) && currentDate.isBefore(startOfNextMonth),
        isToday: currentDate.isSame(moment()),
      });
    }

    currentDate.add(1, 'day');
  }
  return calendar;
};
