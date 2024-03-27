import styled from 'styled-components';

const StyledTitle = styled.div`
  flex: 1 1 auto;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
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
