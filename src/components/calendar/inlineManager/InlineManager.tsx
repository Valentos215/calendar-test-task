import { useState } from 'react';
import styled from 'styled-components';
import { ITask } from 'types/types';
import TaskCard from './TaskCard';
import { Moment } from 'moment';
import HolidayCard from './HolidayCard';

const StyledInlineManager = styled.div`
  display: flex;
  flex-direction: column;
`;

type TInlineManagerProps = {
  tasks: ITask[] | null;
  selectedDate: Moment;
  holiday: string | null;
};

const InlineManager = ({ tasks, selectedDate, holiday }: TInlineManagerProps) => {
  const [editTask, setEditTask] = useState<ITask | null>(null);
  const [newTask, setNewTask] = useState<ITask | null>(null);

  return (
    <StyledInlineManager>
      {!!holiday && <HolidayCard holiday={holiday} />}
      {!!tasks?.length && tasks.map((task) => <TaskCard task={task} />)}
    </StyledInlineManager>
  );
};

export default InlineManager;
