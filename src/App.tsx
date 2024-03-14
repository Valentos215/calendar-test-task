import { useState } from 'react';
import Header from 'components/header/Header';
import styled from 'styled-components';
import moment from 'moment';
import MonthlyCalendar from 'components/calendar/MonthlyCalendar';

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
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

function App() {
  const [selectedDate, setSelectedDate] = useState(moment());

  return (
    <AppWrapper>
      <Container>
        <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <MonthlyCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </Container>
    </AppWrapper>
  );
}

export default App;
