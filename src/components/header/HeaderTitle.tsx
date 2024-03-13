import styled from 'styled-components';

const StyledTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  flex: 1 0 auto;
  text-align: center;
  margin-left: 10vw;
  @media (max-width: 769px) {
    margin-left: 0;
  }
`;

type THeaderTitleProps = {
  text: string;
};

const HeaderTitle = ({ text }: THeaderTitleProps) => {
  return <StyledTitle>{text}</StyledTitle>;
};

export default HeaderTitle;
