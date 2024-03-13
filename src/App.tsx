import { useState } from 'react';
import Header from 'components/header/Header';
import styled from 'styled-components';
import moment from 'moment';

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 85%;
  background: rgb(238, 239, 241);
  display: flex;
  flex-direction: column;
  @media (max-width: 769px) {
    width: 100%;
  }
`;

function App() {
  const [currentDate, setCurrentDate] = useState(moment());

  return (
    <AppWrapper>
      <Container>
        <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
        App
      </Container>
    </AppWrapper>
  );
}

export default App;
