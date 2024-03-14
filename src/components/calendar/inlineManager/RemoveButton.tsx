import styled from 'styled-components';
import basketLogo from 'assets/basket.svg';

const StyledRemoveButton = styled.div`
  margin-right: 1rem;
`;

const StyledImg = styled.img`
  height: 1.5rem;
`;

type TRemoveButtonProps = {
  onButtonClick: () => void;
};

const RemoveButton = ({ onButtonClick }: TRemoveButtonProps) => {
  return (
    <StyledRemoveButton>
      <StyledImg alt="Remove button" src={basketLogo} />
    </StyledRemoveButton>
  );
};

export default RemoveButton;
