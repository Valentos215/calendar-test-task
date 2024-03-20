import styled from 'styled-components';

const StyledButtonIcon = styled.img`
  height: 1.2rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);
  }
`;

type TButtonIconProps = {
  onButtonClick: () => void;
  iconSrc: string;
};

const ButtonIcon = ({ onButtonClick, iconSrc }: TButtonIconProps) => {
  return <StyledButtonIcon alt={iconSrc.split('/')[-1]} src={iconSrc} onClick={onButtonClick} />;
};

export default ButtonIcon;
