import styled from 'styled-components';

const StyledHolidayCard = styled.div`
  background: #999;
  font-size: 1.2rem;
  line-height: 2.5rem;
  margin: 0 1rem 0.5rem 1rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
`;

const StyledTitle = styled.div``;

type THolidayCard = {
  holiday: string;
};

const HolidayCard = ({ holiday }: THolidayCard) => {
  return (
    <StyledHolidayCard>
      <StyledTitle>{holiday}</StyledTitle>
    </StyledHolidayCard>
  );
};

export default HolidayCard;
