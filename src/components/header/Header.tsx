import styled from 'styled-components';
import HeaderTitle from './HeaderTitle';
import HeaderButton from './HeaderButton';
import { Moment } from 'moment';
import { Dispatch, SetStateAction } from 'react';

const StyledHeader = styled.header`
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #333;
`;

type THeaderProps = {
  selectedDate: Moment;
  setSelectedDate: Dispatch<SetStateAction<Moment>>;
};

const Header = ({ selectedDate, setSelectedDate }: THeaderProps) => {
  const titleText = `${selectedDate.format('MMMM')} ${selectedDate.year()}`;

  const goToPrevMonth = () => {
    setSelectedDate((prevDate) => prevDate.clone().subtract(1, 'month').startOf('month'));
  };

  const goToNextMonth = () => {
    setSelectedDate((prevDate) => prevDate.clone().add(1, 'month').startOf('month'));
  };

  return (
    <StyledHeader>
      <HeaderTitle text={titleText} />
      <HeaderButton onButtonClick={goToPrevMonth} title="Prev month" />
      <HeaderButton onButtonClick={goToNextMonth} title="Next month" />
    </StyledHeader>
  );
};

export default Header;
