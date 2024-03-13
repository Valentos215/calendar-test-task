import { useState } from 'react';
import Header from 'components/header/Header';
import styled from 'styled-components';
import moment from 'moment';
import { createMonthlyCalendar } from 'components/monthlyCalendar/utils/monthly-calendar-utils';
import { ETaskColor, Holidays } from 'constants/constants';
import { IBusyDate } from 'types/types';
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
  const [currentDate, setCurrentDate] = useState(moment());
  const busyDates: IBusyDate[] = [
    {
      date: 8,
      month: 2,
      year: 2024,
      tasks: [
        {
          title: 'To do',
          color: ETaskColor.GREEN,
        },
      ],
    },
  ];

  const calendarState = createMonthlyCalendar(
    currentDate.month(),
    currentDate.year(),
    busyDates,
    Holidays,
  );

  console.log(calendarState);

  return (
    <AppWrapper>
      <Container>
        <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <MonthlyCalendar />
      </Container>
    </AppWrapper>
  );
}

export default App;
