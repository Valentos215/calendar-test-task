export enum ETaskColor {
  GREEN = 'rgb(96, 190, 80)',
  BLUE = 'rgb(3, 120, 190)',
  YELLOW = 'rgb(242, 215, 0)',
  ORANGE = 'rgb(255, 171, 73)',
  AZURE = 'rgb(0, 195, 225)',
  PURPLE = 'rgb(195, 118, 224)',
}

export const weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type TTaskTextLength = { min: number; max: number };
export const taskTextLength: TTaskTextLength = { min: 5, max: 60 };

export const searchTextLength: number = 20;

export const cellLabelTextLength: number = 20;

export enum EFormError {
  SHORT = `The task must be longer than 5 characters`,
  LONG = 'The task should not be longer than 60 characters.',
  EXIST = 'Such a task has already been created',
}

export const countryCode = 'UA';
