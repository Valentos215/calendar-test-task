import moment, { Moment, isMoment } from 'moment';
import styled from 'styled-components';
import { createMonthlyCalendar } from './utils/calendar-utils';
import { Holidays, exampleBusyDates, weekDays } from 'constants/constants';
import CalendarCell from './CalendarCell';
import { ICalendarDate } from 'types/types';
import { useEffect, useState } from 'react';

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
  setSelectedDate: (value: Moment) => void;
};

const MonthlyCalendar = ({ selectedDate, setSelectedDate }: TMonthlyCalendarProps) => {
  const calendarState = createMonthlyCalendar(selectedDate, exampleBusyDates, Holidays);

  const onCellClick = (date: ICalendarDate) => {
    if (date.isRelevant) {
      setSelectedDate(selectedDate.clone().set('date', date.date || 1));
    }
  };

  return (
    <StyledCalendar>
      {weekDays.map((wd) => (
        <WeekDayCell>{wd}</WeekDayCell>
      ))}
      {calendarState.map((d: ICalendarDate) => (
        <CalendarCell
          date={d}
          selectedDate={selectedDate}
          onCellClick={onCellClick}
          key={calendarState.indexOf(d)}
        />
      ))}
    </StyledCalendar>
  );
};

export default MonthlyCalendar;
