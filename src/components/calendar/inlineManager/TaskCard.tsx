import { useState } from 'react';
import styled from 'styled-components';
import { ITask } from 'types/types';
import EditButton from './EditButton';
import RemoveButton from './RemoveButton';

const StyledTaskCard = styled.div`
  background: ${(props) => props.color};
  font-size: 1.5rem;
  line-height: 2.5rem;
  margin-top: 0.5rem;
  padding-left: 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    box-shadow: 0 0 0.3rem #999;
  }
`;

const StyledTitle = styled.div`
  flex: 1 0 auto;
`;

type TTaskCardProps = {
  task: ITask;
};

const TaskCard = ({ task }: TTaskCardProps) => {
  const [isActive, setIsActive] = useState(false);

  const onEditClick = () => {};
  const onRemoveClick = () => {};

  return (
    <StyledTaskCard
      {...task}
      onMouseEnter={() => setIsActive(true)}
      onMouseMove={() => setIsActive(false)}
    >
      <StyledTitle>{task.title}</StyledTitle>
      <EditButton onButtonClick={onEditClick} />
      <RemoveButton onButtonClick={onRemoveClick} />
    </StyledTaskCard>
  );
};

export default TaskCard;
