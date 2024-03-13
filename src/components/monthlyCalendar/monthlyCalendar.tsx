import styled from 'styled-components';

const StyledCalendar = styled.div`
  background: red;
  height: 60vw;
`;

type TMonthlyCalendarProps = {
  text: string;
};

const MonthlyCalendar = () => {
  return <StyledCalendar>Calendar</StyledCalendar>;
};

export default MonthlyCalendar;
