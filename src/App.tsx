import { useContext, useEffect, useState } from 'react';
import Header from 'components/header/Header';
import styled from 'styled-components';
import Calendar from 'components/calendar/Calendar';
import { SelectedDateContext, SelectedDateProvider } from 'contexts/selectedDateContext';
import useFetch from 'shared/hooks/useFetch';
import { IHoliday } from 'types/types';
import { getHolidays } from 'utils/utils';
import Preloader from 'shared/components/preloader/Preloader';
import { countryCode } from 'constants/constants';

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

const ErrorTitle = styled.h1`
  margin-top: 5rem;
  text-align: center;
`;

function App() {
  const [filter, setFilter] = useState('');
  const [selectedDate] = useContext(SelectedDateContext);
  const { isLoading, response, error, doFetch } = useFetch(
    `PublicHolidays/${selectedDate.year()}/${countryCode}`,
  );
  const [holidays, setHolidays] = useState<IHoliday[]>([]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!response) return;
    setHolidays(getHolidays(selectedDate, response));
  }, [selectedDate, response]);

  return (
    <AppWrapper>
      <Container>
        <SelectedDateProvider>
          <Header isLoading={isLoading} filter={filter} setFilter={setFilter} />
          {!!response && <Calendar holidays={holidays} filter={filter} />}
          {isLoading && <Preloader />}
          {!!error && <ErrorTitle>Some error happened</ErrorTitle>}
        </SelectedDateProvider>
      </Container>
    </AppWrapper>
  );
}

export default App;
