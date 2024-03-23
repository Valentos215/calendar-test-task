import { Dispatch, SetStateAction, useContext, useState } from 'react';
import styled from 'styled-components';
import CalendarCell from './CalendarCell';
import { createMonthlyCalendar, setDate } from 'components/calendar/utils/calendar-utils';
import { holidays, weekDays } from 'constants/constants';
import { IBusyDate, ICalendarDate, ITask } from 'types/types';
import { SelectedDateContext } from 'contexts/selectedDateContext';

const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25vw;
  padding: 0.2vw 0.3vw;
`;

const WeekDayCell = styled.div`
  text-align: center;
  line-height: 2rem;
  font-weight: 700;
`;

type TMonthlyCalendarProps = {
  filteredBusyDates: IBusyDate[];
  setBusyDates: Dispatch<SetStateAction<IBusyDate[]>>;
  draggedTask: ITask | null;
};

const MonthlyCalendar = ({
  filteredBusyDates,
  setBusyDates,
  draggedTask,
}: TMonthlyCalendarProps) => {
  const [selectedDate, setSelectedDate] = useContext(SelectedDateContext);
  const calendarState = createMonthlyCalendar(selectedDate, filteredBusyDates, holidays);
  const [hoveredDate, setHoveredDate] = useState<ICalendarDate | null>(null);

  const onCellClick = (date: ICalendarDate) => {
    setDate(date, setSelectedDate);
  };

  return (
    <StyledCalendar>
      {weekDays.map((wd) => (
        <WeekDayCell key={wd}>{wd}</WeekDayCell>
      ))}
      {calendarState.map((d: ICalendarDate) => (
        <CalendarCell
          date={d}
          onCellClick={onCellClick}
          hoveredDate={hoveredDate}
          setHoveredDate={setHoveredDate}
          draggedTask={draggedTask}
          setBusyDates={setBusyDates}
          key={calendarState.indexOf(d)}
        />
      ))}
    </StyledCalendar>
  );
};

export default MonthlyCalendar;
