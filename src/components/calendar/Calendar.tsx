import { Moment } from 'moment';
import styled from 'styled-components';
import MonthlyCalendar from './MonthlyCalendar';

const StyledCalendar = styled.div`
  display: flex;
  flex-direction: column;
`;

type TCalendarProps = {
  selectedDate: Moment;
  setSelectedDate: (value: Moment) => void;
};

const Calendar = ({ selectedDate, setSelectedDate }: TCalendarProps) => {
  return (
    <StyledCalendar>
      <MonthlyCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </StyledCalendar>
  );
};

export default Calendar;
