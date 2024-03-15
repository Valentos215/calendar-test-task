import styled from 'styled-components';

const StyledEditButton = styled.img`
  height: 1.2rem;
  margin-left: 1rem;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);
  }
`;

type TEditButtonProps = {
  onButtonClick: () => void;
  iconSrc: string;
};

const ButtonIcon = ({ onButtonClick, iconSrc }: TEditButtonProps) => {
  return <StyledEditButton alt={iconSrc.split('/')[-1]} src={iconSrc} onClick={onButtonClick} />;
};

export default ButtonIcon;
