import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IBusyDate, ITask } from 'types/types';
import TaskCard from './TaskCard';
import { Moment } from 'moment';
import HolidayCard from './HolidayCard';
import { ETaskColor } from 'constants/constants';
import TaskForm from './TaskForm';
import { addTask } from './utils/inline-manager-utils';
import plusLogo from 'assets/plus.svg';
import ButtonIcon from './ButtonIcon';

const StyledInlineManager = styled.div`
  display: flex;
  flex-direction: column;
`;

const Styledtitle = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
  margin: 1rem 0;
  text-align: center;
`;

type TInlineManagerProps = {
  tasks: ITask[] | null;
  selectedDate: Moment;
  holiday: string | null;
  busyDates: IBusyDate[];
  setBusyDates: Dispatch<SetStateAction<IBusyDate[]>>;
};

const InlineManager = ({
  tasks,
  selectedDate,
  holiday,
  setBusyDates,
  busyDates,
}: TInlineManagerProps) => {
  const [newTask, setNewTask] = useState<ITask>({ title: '', color: ETaskColor.AZURE });
  const [isSomeChangingNow, setIsSomeChangingNow] = useState<boolean>(false);
  const [isCreateInProcess, setIsCreateInProcess] = useState<boolean>(false);
  const [error, setError] = useState('');
  const title = selectedDate.format('dddd, D MMMM');

  useEffect(() => {
    if (isSomeChangingNow) {
      setIsCreateInProcess(false);
    }
  }, [isSomeChangingNow]);

  const onCreateClick = () => {
    setIsCreateInProcess(true);
  };

  const onCancelClick = () => {
    setNewTask({ title: '', color: ETaskColor.AZURE });
    setIsCreateInProcess(false);
  };

  const onConfirmClick = () => {
    if (!error) {
      addTask(newTask, selectedDate, setBusyDates);
      setIsCreateInProcess(false);
      setNewTask({ title: '', color: ETaskColor.AZURE });
    }
  };

  return (
    <StyledInlineManager>
      <Styledtitle>{title}</Styledtitle>
      {!!holiday && <HolidayCard holiday={holiday} />}
      {!!tasks?.length &&
        tasks.map((task) => (
          <TaskCard
            task={task}
            selectedDate={selectedDate}
            setBusyDates={setBusyDates}
            setIsSomeChangingNow={setIsSomeChangingNow}
            key={task.title}
            busyDates={busyDates}
          />
        ))}
      {isCreateInProcess && (
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
      {!isCreateInProcess && !isSomeChangingNow && (
        <ButtonIcon onButtonClick={onCreateClick} iconSrc={plusLogo} />
      )}
    </StyledInlineManager>
  );
};

export default InlineManager;
