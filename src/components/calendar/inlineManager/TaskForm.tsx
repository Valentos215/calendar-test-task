import styled from 'styled-components';
import { ITask } from 'types/types';
import confirmLogo from 'assets/ok.svg';
import cancelLogo from 'assets/cancel.svg';
import ButtonIcon from './ButtonIcon';

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
  font-size: 1.3rem;
  border-radius: 0.5rem;
`;

type TTaskFormProps = {
  newTask: ITask;
  setNewTask: (value: ITask) => void;
  error: string;
  setError: (value: string) => void;
  onCancelClick: () => void;
  onConfirmClick: () => void;
};

const TaskForm = ({
  newTask,
  setNewTask,
  error,
  setError,
  onCancelClick,
  onConfirmClick,
}: TTaskFormProps) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setNewTask({ ...newTask, title: e.target.value });
  };

  return (
    <StyledTaskForm>
      <StyledInput value={newTask.title} onChange={onInputChange} />
      <ButtonIcon onButtonClick={onCancelClick} iconSrc={cancelLogo} />
      <ButtonIcon onButtonClick={onConfirmClick} iconSrc={confirmLogo} />
    </StyledTaskForm>
  );
};

export default TaskForm;
