import { Moment } from 'moment';
import { IBusyDate, ITask } from 'types/types';

const compareDates = (busyDate: IBusyDate, date: Moment) => {
  return (
    busyDate.date === date.date() &&
    busyDate.month === date.month() &&
    busyDate.year === date.year()
  );
};

export const removeTask = (task: ITask, date: Moment, setBusyDates: any) => {
  setBusyDates((prevBusyDates: IBusyDate[]) => {
    if (prevBusyDates.length) {
      const foundBusyDay = prevBusyDates.find((bd) => compareDates(bd, date));
      const tasksLength = foundBusyDay ? foundBusyDay.tasks.length : null;

      // if there is only one task in the array

      if (tasksLength === 1) {
        return prevBusyDates.filter((bd) => !compareDates(bd, date));
      }
    }

    // if there is more than one task in the array

    return prevBusyDates.map((busyDay) => {
      if (compareDates(busyDay, date)) {
        const newTasks = busyDay.tasks.filter((t) => !(t.title === task.title));
        return { ...busyDay, tasks: newTasks };
      }

      return busyDay;
    });
  });
};

export const addTask = (task: ITask, date: Moment, setBusyDates: any) => {
  setBusyDates((prevBusyDates: IBusyDate[]) => {
    // if there are tasks in the array

    if (prevBusyDates.length) {
      const foundBusyDay = prevBusyDates.find((busyDate) => compareDates(busyDate, date));

      if (!!foundBusyDay) {
        return prevBusyDates.map((busyDate) => {
          if (compareDates(busyDate, date)) {
            const newTasks = [...busyDate.tasks, task];
            return { ...busyDate, tasks: newTasks };
          }
          return busyDate;
        });
      }
    }

    // if there are no tasks in the array

    const newBusyDate: IBusyDate = {
      date: date.date(),
      month: date.month(),
      year: date.year(),
      tasks: [task],
    };
    return [...prevBusyDates, newBusyDate];
  });
};

export const editTask = (prevTask: ITask, newTask: ITask, date: Moment, setBusyDates: any) => {
  setBusyDates((prevBusyDates: IBusyDate[]) => {
    return prevBusyDates.map((busyDate) => {
      if (compareDates(busyDate, date)) {
        const newTasks = busyDate.tasks.map((task) => {
          if (task.title === prevTask.title) {
            return newTask;
          }
          return task;
        });
        return { ...busyDate, tasks: newTasks };
      }
      return busyDate;
    });
  });
};

export const findTask = (task: ITask, date: Moment, busyDates: IBusyDate[]) => {
  if (busyDates.length) {
    const foundBusyDay = busyDates.find((busyDate) => compareDates(busyDate, date));

    return foundBusyDay?.tasks.some((t) => t.title === task.title);
  }
  return false;
};
