import styled from 'styled-components';
import { sliceText } from 'utils/utils';

const StyledHolidayLabel = styled.div`
  background: #777;
  font-size: 0.8rem;
  color: white;
  padding: 0.2rem;
  border-radius: 0.2rem;
  margin-top: 0.2rem;
`;

interface IHolidayLabelProps {
  holiday: string;
}

const HolidayLabel = ({ holiday }: IHolidayLabelProps) => {
  return <StyledHolidayLabel>{sliceText(holiday, 20)}</StyledHolidayLabel>;
};

export default HolidayLabel;
