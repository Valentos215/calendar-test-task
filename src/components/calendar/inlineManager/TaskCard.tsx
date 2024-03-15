import { useState } from 'react';
import styled from 'styled-components';
import { IBusyDate, ITask } from 'types/types';
import { Moment } from 'moment';
import { editTask, removeTask } from './utils/inline-manager-utils';
import TaskForm from './TaskForm';
import ButtonIcon from './ButtonIcon';
import { EFormError, ETaskColor } from 'constants/constants';
import editLogo from 'assets/edit.svg';
import basketLogo from 'assets/basket.svg';

const StyledTaskCard = styled.div`
  background: ${(props) => props.color};
  font-size: 1.3rem;
  line-height: 2.5rem;
  margin: 0 1rem 0.5rem 1rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0.3rem #999;
  }
`;

const StyledTitle = styled.div`
  flex: 1 0 auto;
`;

type TTaskCardProps = {
  task: ITask;
  selectedDate: Moment;
  setBusyDates: (value: IBusyDate[]) => void;
  setIsSomeChangingNow: (value: boolean) => void;
};

const TaskCard = ({ task, selectedDate, setBusyDates, setIsSomeChangingNow }: TTaskCardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isChangingNow, setIsChangingNow] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<ITask>({ title: '', color: ETaskColor.AZURE });
  const [error, setError] = useState('');

  const onEditClick = () => {
    setNewTask(task);
    setIsChangingNow(true);
    setIsSomeChangingNow(true);
  };

  const onRemoveClick = () => {
    removeTask(task, selectedDate, setBusyDates);
  };

  const onCancelClick = () => {
    setIsChangingNow(false);
    setIsSomeChangingNow(false);
  };

  const onConfirmClick = () => {
    if (!newTask?.title.length || (newTask?.title.length && newTask?.title.length <= 5)) {
      setError(EFormError.SHORT);
    }
    if (!error.length) {
      editTask(task, newTask, selectedDate, setBusyDates);
      setIsChangingNow(false);
      setIsSomeChangingNow(false);
    }
  };

  return (
    <>
      {!isChangingNow && (
        <StyledTaskCard
          {...task}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
        >
          <StyledTitle>{task.title}</StyledTitle>
          {isActive && (
            <>
              <ButtonIcon onButtonClick={onEditClick} iconSrc={editLogo} />
              <ButtonIcon onButtonClick={onRemoveClick} iconSrc={basketLogo} />
            </>
          )}
        </StyledTaskCard>
      )}
      {isChangingNow && (
        <TaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          error={error}
          setError={setError}
          onCancelClick={onCancelClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </>
  );
};

export default TaskCard;
