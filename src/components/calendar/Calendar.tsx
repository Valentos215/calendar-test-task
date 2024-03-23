import { memo, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import MonthlyCalendar from 'components/calendar/monthlyCalendar/MonthlyCalendar';
import InlineManager from './inlineManager/InlineManager';
import useLocalStorage from 'shared/hooks/useLocalStorage';
import { filterBusyDates, findHoliday } from './utils/calendar-utils';
import { IBusyDate, IHoliday, ITask } from 'types/types';
import { SelectedDateContext } from 'contexts/selectedDateContext';

const StyledCalendar = styled.div`
  display: flex;
  flex-direction: column;
`;

type TCalendarProps = {
  filter: string;
  holidays: IHoliday[];
};

const Calendar = memo(({ filter, holidays }: TCalendarProps) => {
  const [localBusyDates, setLocalBusyDates] = useLocalStorage('Busy Dates');
  const [busyDates, setBusyDates] = useState<IBusyDate[]>([]);
  const [selectedDate] = useContext(SelectedDateContext);
  const [draggedTask, setDraggedTask] = useState<ITask | null>(null);

  const holiday = findHoliday(holidays, selectedDate);

  useEffect(() => {
    if (!localBusyDates) {
      return;
    }
    setBusyDates(JSON.parse(localBusyDates));
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
        filteredBusyDates={filteredBusyDates}
        setBusyDates={setBusyDates}
        draggedTask={draggedTask}
        holidays={holidays}
      />
      <InlineManager
        filteredBusyDates={filteredBusyDates}
        setBusyDates={setBusyDates}
        holiday={holiday}
        draggedTask={draggedTask}
        setDraggedTask={setDraggedTask}
      />
    </StyledCalendar>
  );
});

export default Calendar;
