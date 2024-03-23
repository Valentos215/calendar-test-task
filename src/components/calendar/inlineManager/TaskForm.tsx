import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { IBusyDate, ITask } from 'types/types';
import confirmLogo from 'assets/ok.svg';
import cancelLogo from 'assets/cancel.svg';
import ButtonIcon from './ButtonIcon';
import { EFormError, taskTextLength } from 'constants/constants';
import { getIsTaskExist } from './utils/inline-manager-utils';
import ChangeColor from './ChangeColor';
import { SelectedDateContext } from 'contexts/selectedDateContext';

const StyledTaskForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0 1rem;
`;

const StyledInput = styled.input`
  flex: 1 0 auto;
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
`;

const StyledError = styled.div`
  margin: 0.5rem 1rem;
  color: red;
`;

type TTaskFormProps = {
  newTask: ITask;
  setNewTask: Dispatch<SetStateAction<ITask>>;
  error: string;
  setError: (value: string) => void;
  onCancelClick: () => void;
  onConfirmClick: () => void;
  busyDates: IBusyDate[];
  isTaskChanging: boolean;
};

const TaskForm = ({
  newTask,
  setNewTask,
  error,
  setError,
  onCancelClick,
  onConfirmClick,
  busyDates,
  isTaskChanging,
}: TTaskFormProps) => {
  const [selectedDate] = useContext(SelectedDateContext);

  useEffect(() => {
    // validation of task text

    setError('');
    if (!newTask?.title.length || newTask?.title.length < taskTextLength.min) {
      setError(EFormError.SHORT);
    }
    if (newTask?.title.length > taskTextLength.max) {
      setError(EFormError.LONG);
    }
    if (getIsTaskExist(newTask, selectedDate, busyDates) && !isTaskChanging) {
      setError(EFormError.EXIST);
    }
  }, [newTask, setError, selectedDate, busyDates, isTaskChanging]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, title: e.target.value.slice(0, taskTextLength.max + 1) });
  };

  return (
    <>
      <StyledTaskForm>
        <StyledInput value={newTask.title} onChange={onInputChange} />
        <ChangeColor newTask={newTask} setNewTask={setNewTask} />
        <ButtonIcon onButtonClick={onCancelClick} iconSrc={cancelLogo} />
        <ButtonIcon onButtonClick={onConfirmClick} iconSrc={confirmLogo} />
      </StyledTaskForm>
      <StyledError>{error}</StyledError>
    </>
  );
};

export default TaskForm;
