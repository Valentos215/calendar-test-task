import styled from 'styled-components';
import { ITask } from 'types/types';
import { sliceText } from 'utils/utils';

interface IStyledTaskLabelProps {
  color: String;
}

const StyledTaskLabel = styled.div<IStyledTaskLabelProps>`
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  background: ${({ color }) => `${color}`};
  margin-top: 0.2rem;
`;

interface ILabelProps {
  tasks: ITask[];
}

const TaskLabel = ({ tasks }: ILabelProps) => {
  const color: string = tasks[0].color;
  return <StyledTaskLabel color={color}>{sliceText(tasks[0].title, 20)}</StyledTaskLabel>;
};

export default TaskLabel;
