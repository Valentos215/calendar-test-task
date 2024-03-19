import { Moment } from 'moment';
import styled from 'styled-components';
import MonthlyCalendar from 'components/calendar/monthlyCalendar/MonthlyCalendar';
import { holidays } from 'constants/constants';
import InlineManager from './inlineManager/InlineManager';
import { findHoliday, findTasks } from './utils/calendar-utils';
import useLocalStorage from 'shared/hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { IBusyDate } from 'types/types';

const StyledCalendar = styled.div`
  display: flex;
  flex-direction: column;
`;

type TCalendarProps = {
  selectedDate: Moment;
  setSelectedDate: (value: Moment) => void;
};

const Calendar = ({ selectedDate, setSelectedDate }: TCalendarProps) => {
  const [localBusyDates, setLocalBusyDates] = useLocalStorage('');
  const [busyDates, setBusyDates] = useState<IBusyDate[]>([]);

  const tasks = findTasks(busyDates, selectedDate);
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
  }, [busyDates, setBusyDates]);

  return (
    <StyledCalendar>
      <MonthlyCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        busyDates={busyDates}
      />
      <InlineManager
        tasks={tasks}
        selectedDate={selectedDate}
        holiday={holiday}
        busyDates={busyDates}
        setBusyDates={setBusyDates}
      />
    </StyledCalendar>
  );
};

export default Calendar;
