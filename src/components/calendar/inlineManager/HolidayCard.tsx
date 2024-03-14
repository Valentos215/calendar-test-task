import styled from 'styled-components';

const StyledHolidayCard = styled.div`
  background: #999;
  font-size: 1.5rem;
  line-height: 2.5rem;
  margin-top: 0.5rem;
  padding-left: 2rem;
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
