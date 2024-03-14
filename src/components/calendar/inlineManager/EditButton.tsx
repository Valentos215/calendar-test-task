import styled from 'styled-components';
import editLogo from 'assets/edit.svg';

const StyledEditButton = styled.div`
  margin-right: 1rem;
`;
const StyledImg = styled.img`
  height: 1.5rem;
`;

type TEditButtonProps = {
  onButtonClick: () => void;
};

const EditButton = ({ onButtonClick }: TEditButtonProps) => {
  return (
    <StyledEditButton>
      <StyledImg alt="Edit Button" src={editLogo} />
    </StyledEditButton>
  );
};

export default EditButton;
