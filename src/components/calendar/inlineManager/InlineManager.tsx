import { Dispatch, SetStateAction, memo, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IBusyDate, ITask } from 'types/types';
import TaskCard from './TaskCard';
import HolidayCard from './HolidayCard';
import { ETaskColor } from 'constants/constants';
import TaskForm from './TaskForm';
import { addTask } from './utils/inline-manager-utils';
import plusLogo from 'assets/plus.svg';
import ButtonIcon from './ButtonIcon';
import { findTasks } from '../utils/calendar-utils';
import { SelectedDateContext } from 'contexts/selectedDateContext';

const StyledInlineManager = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
  margin: 1rem 0;
  text-align: center;
`;

const CreateButtonField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

type TInlineManagerProps = {
  holiday: string | null;
  filteredBusyDates: IBusyDate[];
  setBusyDates: Dispatch<SetStateAction<IBusyDate[]>>;
  draggedTask: ITask | null;
  setDraggedTask: (value: ITask) => void;
};

const InlineManager = memo(
  ({
    holiday,
    setBusyDates,
    filteredBusyDates,
    draggedTask,
    setDraggedTask,
  }: TInlineManagerProps) => {
    const [selectedDate] = useContext(SelectedDateContext);
    const [newTask, setNewTask] = useState<ITask>({ title: '', color: ETaskColor.AZURE });
    const [isSomeChangingNow, setIsSomeChangingNow] = useState<boolean>(false);
    const [isCreateInProcess, setIsCreateInProcess] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [hoveredTask, setHoveredTask] = useState<ITask | null>(null);

    const title = selectedDate.format('dddd, D MMMM');
    const tasks = findTasks(filteredBusyDates, selectedDate);

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
        <StyledTitle>{title}</StyledTitle>
        {!!holiday && <HolidayCard holiday={holiday} />}
        {!!tasks?.length &&
          tasks.map((task) => (
            <TaskCard
              task={task}
              setBusyDates={setBusyDates}
              isSomeChangingNow={isSomeChangingNow}
              setIsSomeChangingNow={setIsSomeChangingNow}
              key={task.title}
              filteredBusyDates={filteredBusyDates}
              draggedTask={draggedTask}
              setDraggedTask={setDraggedTask}
              hoveredTask={hoveredTask}
              setHoveredTask={setHoveredTask}
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
            filteredBusyDates={filteredBusyDates}
            isTaskChanging={false}
          />
        )}

        {!isCreateInProcess && !isSomeChangingNow && (
          <CreateButtonField>
            <ButtonIcon onButtonClick={onCreateClick} iconSrc={plusLogo} />
          </CreateButtonField>
        )}
      </StyledInlineManager>
    );
  },
);

export default InlineManager;
