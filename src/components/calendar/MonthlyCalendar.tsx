import { Moment } from 'moment';
import styled from 'styled-components';
import { createMonthlyCalendar } from './utils/calendar-utils';
import { Holidays, exampleBusyDates, weekDays } from 'constants/constants';
import CalendarCell from './CalendarCell';
import { ICalendarDate } from 'types/types';

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
  const monthlyCalendar = createMonthlyCalendar(selectedDate, exampleBusyDates, Holidays);
  const onCellClick = () => {};

  return (
    <StyledCalendar>
      {weekDays.map((wd) => (
        <WeekDayCell>{wd}</WeekDayCell>
      ))}
      {monthlyCalendar.map((d: ICalendarDate) => (
        <CalendarCell
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          date={d}
          key={monthlyCalendar.indexOf(d)}
        />
      ))}
    </StyledCalendar>
  );
};

export default MonthlyCalendar;
