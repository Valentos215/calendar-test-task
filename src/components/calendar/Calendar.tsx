import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import MonthlyCalendar from 'components/calendar/monthlyCalendar/MonthlyCalendar';
import InlineManager from './inlineManager/InlineManager';
import useLocalStorage from 'shared/hooks/useLocalStorage';
import { holidays } from 'constants/constants';
import { filterBusyDates, findHoliday } from './utils/calendar-utils';
import { IBusyDate, ITask } from 'types/types';
import { SelectedDateContext } from 'contexts/selectedDateContext';

const StyledCalendar = styled.div`
  display: flex;
  flex-direction: column;
`;

type TCalendarProps = {
  filter: string;
};

const Calendar = ({ filter }: TCalendarProps) => {
  const [localBusyDates, setLocalBusyDates] = useLocalStorage('');
  const [busyDates, setBusyDates] = useState<IBusyDate[]>(JSON.parse(localBusyDates) || []);
  const [selectedDate] = useContext(SelectedDateContext);
  const [draggedTask, setDraggedTask] = useState<ITask | null>(null);

  const holiday = findHoliday(holidays, selectedDate);

  useEffect(() => {
    if (!busyDates) {
      return;
    }
    setLocalBusyDates(JSON.stringify(busyDates));
  }, [busyDates, setLocalBusyDates]);

  const filteredBusyDates = filterBusyDates(busyDates, filter);

  return (
    <StyledCalendar>
      <MonthlyCalendar
        filteredBusyDates={filteredBusyDates}
        setBusyDates={setBusyDates}
        draggedTask={draggedTask}
      />
      <InlineManager
        busyDates={filteredBusyDates}
        setBusyDates={setBusyDates}
        holiday={holiday}
        draggedTask={draggedTask}
        setDraggedTask={setDraggedTask}
      />
    </StyledCalendar>
  );
};

export default Calendar;
