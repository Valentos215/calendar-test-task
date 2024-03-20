import { Dispatch, SetStateAction, useState } from 'react';
import { Moment } from 'moment';
import styled from 'styled-components';
import CalendarCell from './CalendarCell';
import { createMonthlyCalendar, setDate } from 'components/calendar/utils/calendar-utils';
import { holidays, weekDays } from 'constants/constants';
import { IBusyDate, ICalendarDate, ITask } from 'types/types';

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
  selectedDate: Moment;
  setSelectedDate: Dispatch<SetStateAction<Moment>>;
  busyDates: IBusyDate[];
  draggedTask: ITask | null;
  setBusyDates: Dispatch<SetStateAction<IBusyDate[]>>;
};

const MonthlyCalendar = ({
  selectedDate,
  setSelectedDate,
  busyDates,
  draggedTask,
  setBusyDates,
}: TMonthlyCalendarProps) => {
  const calendarState = createMonthlyCalendar(selectedDate, busyDates, holidays);
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
          selectedDate={selectedDate}
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
