import { Dispatch, DragEvent, SetStateAction, useState } from 'react';
import { Moment } from 'moment';
import styled, { css } from 'styled-components';
import { IBusyDate, ITask } from 'types/types';
import { editTask, reorderTask, removeTask } from './utils/inline-manager-utils';
import TaskForm from './TaskForm';
import ButtonIcon from './ButtonIcon';
import { ETaskColor } from 'constants/constants';
import editLogo from 'assets/edit.svg';
import basketLogo from 'assets/basket.svg';

const StyledTaskCard = styled.div<{ color: string; isHovered: boolean }>`
  background: ${(props) => props.color};
  font-size: 1.2rem;
  line-height: 2.5rem;
  margin: 0 1rem 0.5rem 1rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: grab;
  &:hover {
    box-shadow: 0 0 0.3rem #999;
  }
  ${(props) =>
    props.isHovered
      ? css`
          box-shadow: 0 0 1rem #535353;
        `
      : css`
          box-shadow: none;
        `};
`;

const StyledTitle = styled.div`
  flex: 1 1 auto;
`;

type TTaskCardProps = {
  task: ITask;
  selectedDate: Moment;
  busyDates: IBusyDate[];
  setBusyDates: Dispatch<SetStateAction<IBusyDate[]>>;
  isSomeChangingNow: boolean;
  setIsSomeChangingNow: (value: boolean) => void;
  draggedTask: ITask | null;
  setDraggedTask: (value: ITask) => void;
  hoveredTask: ITask | null;
  setHoveredTask: (value: ITask | null) => void;
};

const TaskCard = ({
  task,
  selectedDate,
  busyDates,
  setBusyDates,
  isSomeChangingNow,
  setIsSomeChangingNow,
  draggedTask,
  setDraggedTask,
  hoveredTask,
  setHoveredTask,
}: TTaskCardProps) => {
  const [isChangingNow, setIsChangingNow] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<ITask>({ title: '', color: ETaskColor.AZURE });
  const [error, setError] = useState('');

  const onEditClick = () => {
    if (isSomeChangingNow) return;
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
    if (!error) {
      editTask(task, newTask, selectedDate, setBusyDates);
      setIsChangingNow(false);
      setIsSomeChangingNow(false);
    }
  };

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, task: ITask) => {
    setDraggedTask(task);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    setHoveredTask(null);
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>, task: ITask) => {
    e.preventDefault();
    setHoveredTask(task);
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, task: ITask) => {
    e.preventDefault();
    reorderTask(task, draggedTask, selectedDate, setBusyDates);
  };

  const isHovered = hoveredTask?.title === task.title;

  return (
    <>
      {!isChangingNow && (
        <StyledTaskCard
          color={task.color}
          isHovered={isHovered}
          draggable={true}
          onDragStart={(e: DragEvent<HTMLDivElement>) => dragStartHandler(e, task)}
          onDragLeave={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
          onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
          onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e, task)}
          onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, task)}
        >
          <StyledTitle>{task.title}</StyledTitle>
          <ButtonIcon onButtonClick={onEditClick} iconSrc={editLogo} />
          <ButtonIcon onButtonClick={onRemoveClick} iconSrc={basketLogo} />
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
          selectedDate={selectedDate}
          busyDates={busyDates}
        />
      )}
    </>
  );
};

export default TaskCard;
