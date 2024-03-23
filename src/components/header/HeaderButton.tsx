import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 1rem;
  line-height: 2rem;
  font-weight: 700;
  width: 7rem;
  background: rgb(216, 218, 220);
  margin-left: 1rem;
  border-radius: 0.3rem;
  border: 1px solid #888;
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0 0 0.3rem #999;
  }
  &:active {
    transform: scale(0.96);
  }
`;

type THeaderButtonProps = {
  title: string;
  onButtonClick: () => void;
  disabled: boolean;
};

const HeaderButton = ({ title, onButtonClick, disabled }: THeaderButtonProps) => {
  return (
    <StyledButton disabled={disabled} onClick={onButtonClick}>
      {title}
    </StyledButton>
  );
};

export default HeaderButton;
