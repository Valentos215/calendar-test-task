import { useState } from 'react';
import Header from 'components/header/Header';
import styled from 'styled-components';
import moment from 'moment';
import { createMonthlyCalendar } from 'components/monthlyCalendar/utils/monthly-calendar-utils';
import { Holidays, exampleBusyDates } from 'constants/constants';
import MonthlyCalendar from 'components/monthlyCalendar/MonthlyCalendar';

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 80vw;
  max-width: 1200px;
  background: rgb(238, 239, 241);
  display: flex;
  flex-direction: column;
  @media (max-width: 769px) {
    width: 100%;
  }
`;

function App() {
  const [selectedDate, setSelectedDate] = useState(moment());

  const monthlyCalendar = createMonthlyCalendar(selectedDate, exampleBusyDates, Holidays);

  console.log(monthlyCalendar);

  return (
    <AppWrapper>
      <Container>
        <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <MonthlyCalendar />
      </Container>
    </AppWrapper>
  );
}

export default App;
