import { useState } from 'react';
import Header from 'components/header/Header';
import styled from 'styled-components';
import Calendar from 'components/calendar/Calendar';
import { SelectedDateProvider } from 'contexts/selectedDateContext';

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 80vw;
  max-width: 1000px;
  background: rgb(238, 239, 241);
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

function App() {
  const [filter, setFilter] = useState('');

  return (
    <AppWrapper>
      <Container>
        <SelectedDateProvider>
          <Header filter={filter} setFilter={setFilter} />
          <Calendar filter={filter} />
        </SelectedDateProvider>
      </Container>
    </AppWrapper>
  );
}

export default App;
