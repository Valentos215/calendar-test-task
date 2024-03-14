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

const compareDates = (busyDate: IBusyDate, date: Moment) => {
  return (
    busyDate.date === date.date() &&
    busyDate.month === date.month() &&
    busyDate.year === date.year()
  );
};

export const removeTask = (task: ITask, date: Moment, setBusyDates: any) => {
  setBusyDates((prevBD: IBusyDate[]) => {
    const foundBusyDay = prevBD.find((bd) => compareDates(bd, date));
    const tasksLength = foundBusyDay ? foundBusyDay.tasks.length : null;

    // if there is only one task in the array

    if (tasksLength === 1) {
      return prevBD.filter((bd) => compareDates(bd, date));
    }

    // if there is more than one task in the array

    return prevBD.map((bd) => {
      if (compareDates(bd, date)) {
        const newTasks = bd.tasks.filter((t) => !(t.title === task.title));
        return { ...bd, tasks: newTasks };
      }

      return bd;
    });
  });
};

export const addTask = (task: ITask, date: Moment, setBusyDates: any) => {
  setBusyDates((prevBD: IBusyDate[]) => {
    const foundBusyDay = prevBD.find((bd) => compareDates(bd, date));
    const tasksLength = foundBusyDay ? foundBusyDay.tasks.length : null;

    // if there are no tasks in the array

    if (!tasksLength) {
      const newBusyDate: IBusyDate = {
        date: date.date(),
        month: date.month(),
        year: date.year(),
        tasks: [task],
      };
      return { ...prevBD, newBusyDate };
    }

    // if there are tasks in the array

    return prevBD.map((bd) => {
      if (compareDates(bd, date)) {
        const newTasks = [...bd.tasks, task];
        return { ...bd, tasks: newTasks };
      }
      return bd;
    });
  });
};

export const replaceTask = (prevTask: ITask, newTask: ITask, date: Moment, setBusyDates: any) => {
  setBusyDates((prevBD: IBusyDate[]) => {
    return prevBD.map((bd) => {
      if (compareDates(bd, date)) {
        const newTasks = bd.tasks.map((task) => {
          if (task.title === prevTask.title) {
            return { ...newTask };
          }
        });
        return { ...bd, tasks: newTasks };
      }
      return bd;
    });
  });
};
