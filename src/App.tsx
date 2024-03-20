import { useState } from 'react';
import Header from 'components/header/Header';
import styled from 'styled-components';
import moment from 'moment';
import Calendar from 'components/calendar/Calendar';

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
  const [selectedDate, setSelectedDate] = useState(moment);
  const [filter, setFilter] = useState('');

  return (
    <AppWrapper>
      <Container>
        <Header
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          filter={filter}
          setFilter={setFilter}
        />
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} filter={filter} />
      </Container>
    </AppWrapper>
  );
}

export default App;
