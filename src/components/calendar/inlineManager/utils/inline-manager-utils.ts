import moment, { Moment } from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { ETaskColor } from 'constants/constants';
import { IBusyDate, ICalendarDate, ITask } from 'types/types';

const compareDates = (busyDate: IBusyDate, date: Moment) => {
  return (
    busyDate.date === date.date() &&
    busyDate.month === date.month() &&
    busyDate.year === date.year()
  );
};

export const removeTask = (
  task: ITask,
  date: Moment,
  setBusyDates: Dispatch<SetStateAction<IBusyDate[]>>,
) => {
  setBusyDates((prevBusyDates: IBusyDate[]) => {
    const foundBusyDate = prevBusyDates.find((bd) => compareDates(bd, date));
    const tasksLength = foundBusyDate ? foundBusyDate.tasks.length : null;

    if (tasksLength === 1) {
      // if there is only one task that date

      return prevBusyDates.filter((bd) => !compareDates(bd, date));
      // remove the entire day from the array
    }

    // if there is more than one task in the array

    return prevBusyDates.map((busyDate) => {
      if (compareDates(busyDate, date)) {
        const newTasks = busyDate.tasks.filter(
          (t) => !(t.title === task.title && t.color === task.color),
        );
        // remove the task from current date

        return { ...busyDate, tasks: newTasks };
      }

      return busyDate;
      // return the remaining dates without changes
    });
  });
};

export const addTask = (
  task: ITask,
  date: Moment,
  setBusyDates: Dispatch<SetStateAction<IBusyDate[]>>,
) => {
  setBusyDates((prevBusyDates: IBusyDate[]) => {
    if (prevBusyDates.length) {
      // if there are busy days in the array

      const foundBusyDay = prevBusyDates.find((busyDate) => compareDates(busyDate, date));

      if (foundBusyDay) {
        // if there are other tasks in the current day

        return prevBusyDates.map((busyDate) => {
          if (compareDates(busyDate, date)) {
            const newTasks = [...busyDate.tasks, task];
            return { ...busyDate, tasks: newTasks };
            // add a new task to the current day
          }

          return busyDate;
          // return the remaining dates without changes
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
    // add a new day with a new task
  });
};

export const editTask = (
  prevTask: ITask,
  newTask: ITask,
  date: Moment,
  setBusyDates: Dispatch<SetStateAction<IBusyDate[]>>,
) => {
  setBusyDates((prevBusyDates: IBusyDate[]) => {
    return prevBusyDates.map((busyDate) => {
      if (compareDates(busyDate, date)) {
        // if the day in the array matches the current day

        const newTasks = busyDate.tasks.map((task) => {
          if (task.title === prevTask.title) {
            //if we found prev task in the array

            return newTask;
            // replace prev task with a new one
          }
          return task;
          // return the remaining tasks without changes
        });
        return { ...busyDate, tasks: newTasks };
        // return the old day with new tasks
      }
      return busyDate;
      // return the remaining dates without changes
    });
  });
};

export const getIsTaskExist = (task: ITask, date: Moment, busyDates: IBusyDate[]) => {
  if (busyDates.length) {
    const foundBusyDay = busyDates.find((busyDate) => compareDates(busyDate, date));

    return foundBusyDay?.tasks.some((t) => t.title === task.title);
  }
  return false;
};

export const changeColor = (setNewTask: Dispatch<SetStateAction<any>>) => {
  setNewTask((prevTask: ITask) => {
    const index = Object.values(ETaskColor).indexOf(prevTask.color);
    let nextColor = '';

    if (index === Object.values(ETaskColor).length - 1) {
      // if this is the last element of enum

      nextColor = Object.values(ETaskColor)[0];
      // select the first element of enum
    } else {
      nextColor = Object.values(ETaskColor)[index + 1];
      // else select the next element of enum
    }
    return { ...prevTask, color: nextColor };
    // return prev task with a new color
  });
};

export const reorderTask = (
  prevTask: ITask,
  newTask: ITask | null,
  date: Moment,
  setBusyDates: Dispatch<SetStateAction<IBusyDate[]>>,
) => {
  if (!newTask || prevTask.title === newTask.title) return;

  setBusyDates((prevBusyDates: IBusyDate[]) => {
    return prevBusyDates.map((busyDate) => {
      if (compareDates(busyDate, date)) {
        // if the day in the array matches the current day

        let newTasks: ITask[] = [];
        const indexOfPrevTask = busyDate.tasks.findIndex((task) => task.title === prevTask.title);
        const indexOfNewTask = busyDate.tasks.findIndex((task) => task.title === newTask.title);
        busyDate.tasks.forEach((task) => {
          if (task.title !== newTask.title && task.title !== prevTask.title) {
            // push tasks that are not involved in dragging into the array
            newTasks.push(task);
          }
          if (task.title === prevTask.title) {
            if (indexOfPrevTask > indexOfNewTask) {
              // if the dragged task is in front of the current task
              newTasks.push(prevTask);
              newTasks.push(newTask);
            } else {
              // if the dragged task comes after the current task
              newTasks.push(newTask);
              newTasks.push(prevTask);
            }
          }
        });
        return { ...busyDate, tasks: newTasks };
        // return the old day with new tasks
      }
      return busyDate;
      // return the remaining dates without changes
    });
  });
};

export const reassignTask = (
  task: ITask | null,
  currentDate: Moment,
  newDate: ICalendarDate | null,
  setBusyDates: Dispatch<SetStateAction<IBusyDate[]>>,
) => {
  if (!task || !newDate || newDate.date === null) {
    return;
  }

  removeTask(task, currentDate, setBusyDates);
  // remove the task from the current day

  if (newDate.isRelevant) {
    // if the day is in the current month
    const newMomentDate = moment(currentDate.clone().set('D', newDate.date));
    addTask(task, newMomentDate, setBusyDates);
    // add a task to a new date
  } else {
    if (newDate.date === 1) {
      // if the day is in the next month
      const newMomentDate = moment(currentDate.clone().add(1, 'M').startOf('month'));

      addTask(task, newMomentDate, setBusyDates);
    } else {
      // if the day is in the previous month

      const newMomentDate = moment(currentDate.clone().subtract(1, 'M').set('D', newDate.date));

      addTask(task, newMomentDate, setBusyDates);
    }
  }
};
