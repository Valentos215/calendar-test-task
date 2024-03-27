import { memo, useContext } from 'react';
import styled from 'styled-components';
import HeaderTitle from './HeaderTitle';
import HeaderButton from './HeaderButton';
import Filter from './Filter';
import { SelectedDateContext } from 'contexts/selectedDateContext';

const StyledHeader = styled.header`
  min-height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #333;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LeftColumn = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

type THeaderProps = {
  filter: string;
  setFilter: (value: string) => void;
  isLoading: boolean;
};

const Header = memo(({ filter, setFilter, isLoading }: THeaderProps) => {
  const [selectedDate, setSelectedDate] = useContext(SelectedDateContext);
  const titleText = `${selectedDate.format('MMMM')} ${selectedDate.year()}`;

  const goToPrevMonth = () => {
    setSelectedDate((prevDate) => prevDate.clone().subtract(1, 'month').startOf('month'));
  };

  const goToNextMonth = () => {
    setSelectedDate((prevDate) => prevDate.clone().add(1, 'month').startOf('month'));
  };

  return (
    <StyledHeader>
      <LeftColumn>
        <HeaderTitle text={titleText} />
        <Filter filter={filter} setFilter={setFilter} />
      </LeftColumn>
      <RightColumn>
        <HeaderButton disabled={isLoading} title="Prev month" onButtonClick={goToPrevMonth} />
        <HeaderButton disabled={isLoading} title="Next month" onButtonClick={goToNextMonth} />
      </RightColumn>
    </StyledHeader>
  );
});

export default Header;
