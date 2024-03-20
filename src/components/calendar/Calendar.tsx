import { useEffect, useState } from 'react';
import { Moment } from 'moment';
import styled from 'styled-components';
import MonthlyCalendar from 'components/calendar/monthlyCalendar/MonthlyCalendar';
import InlineManager from './inlineManager/InlineManager';
import useLocalStorage from 'shared/hooks/useLocalStorage';
import { holidays } from 'constants/constants';
import { filterBusyDates, findHoliday } from './utils/calendar-utils';
import { IBusyDate, ITask } from 'types/types';

const StyledCalendar = styled.div`
  display: flex;
  flex-direction: column;
`;

type TCalendarProps = {
  selectedDate: Moment;
  setSelectedDate: (value: Moment) => void;
  filter: string;
};

const Calendar = ({ selectedDate, setSelectedDate, filter }: TCalendarProps) => {
  const [localBusyDates, setLocalBusyDates] = useLocalStorage('');
  const [busyDates, setBusyDates] = useState<IBusyDate[]>([]);
  const [draggedTask, setDraggedTask] = useState<ITask | null>(null);

  const holiday = findHoliday(holidays, selectedDate);

  useEffect(() => {
    if (localBusyDates) {
      setBusyDates(JSON.parse(localBusyDates));
    }
  }, []);

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
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        busyDates={filteredBusyDates}
        draggedTask={draggedTask}
        setBusyDates={setBusyDates}
      />
      <InlineManager
        selectedDate={selectedDate}
        holiday={holiday}
        busyDates={filteredBusyDates}
        setBusyDates={setBusyDates}
        draggedTask={draggedTask}
        setDraggedTask={setDraggedTask}
      />
    </StyledCalendar>
  );
};

export default Calendar;
