import { useContext } from 'react';
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
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

type THeaderProps = {
  filter: string;
  setFilter: (value: string) => void;
};

const Header = ({ filter, setFilter }: THeaderProps) => {
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
        <HeaderButton onButtonClick={goToPrevMonth} title="Prev month" />
        <HeaderButton onButtonClick={goToNextMonth} title="Next month" />
      </RightColumn>
    </StyledHeader>
  );
};

export default Header;
