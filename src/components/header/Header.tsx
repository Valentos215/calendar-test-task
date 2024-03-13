import styled from 'styled-components';
import HeaderTitle from './HeaderTitle';
import HeaderButton from './HeaderButton';
import { Moment } from 'moment';

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
  currentDate: Moment;
  setCurrentDate: (value: Moment) => void;
};

const Header = ({ currentDate, setCurrentDate }: THeaderProps) => {
  const titleText = `${currentDate.format('MMMM')} ${currentDate.year()}`;

  const goToPrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month').startOf('month'));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month').startOf('month'));
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
