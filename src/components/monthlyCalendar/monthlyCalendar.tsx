import styled from 'styled-components';

const StyledCalendar = styled.div`
  background: red;
  &::after {
    content: '';
    display: block;
    padding-top: 60%;
  }
`;

// type TMonthlyCalendarProps = {
//   text: string;
// };

const MonthlyCalendar = () => {
  return <StyledCalendar>Calendar</StyledCalendar>;
};

export default MonthlyCalendar;
