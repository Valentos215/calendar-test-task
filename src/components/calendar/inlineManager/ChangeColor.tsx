import { Dispatch, SetStateAction } from 'react';
import { ETaskColor } from 'constants/constants';
import styled from 'styled-components';
import { ITask } from 'types/types';
import arrowLogo from 'assets/arrow.svg';
import { changeColor } from './utils/inline-manager-utils';

const StyledChangeColor = styled.div<{ color: string }>`
  background: ${(props) => props.color || ETaskColor.BLUE};
  height: 100%;
  width: 4rem;
  font-size: 0.8rem;
  border-radius: 0.2rem;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const LeftArrow = styled.img`
  height: 0.8rem;
`;
const RightArrow = styled(LeftArrow)`
  transform: rotate(180deg);
`;

type TChangeColorProps = {
  newTask: ITask;
  setNewTask: Dispatch<SetStateAction<ITask>>;
};

const ChangeColor = ({ newTask, setNewTask }: TChangeColorProps) => {
  const onButtonClick = () => {
    changeColor(setNewTask);
  };

  return (
    <StyledChangeColor {...newTask} onClick={onButtonClick}>
      <LeftArrow alt="arrow logo" src={arrowLogo} />
      Color
      <RightArrow alt="arrow logo" src={arrowLogo} />
    </StyledChangeColor>
  );
};

export default ChangeColor;
