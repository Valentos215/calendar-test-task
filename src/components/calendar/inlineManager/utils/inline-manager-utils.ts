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

export const editTask = (prevTask: ITask, newTask: ITask, date: Moment, setBusyDates: any) => {
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

export const findTask = (task: ITask, date: Moment, busyDates: IBusyDate[]) => {
  const foundBusyDay = busyDates.find((bd) => compareDates(bd, date));
  return foundBusyDay?.tasks.includes(task);
};
