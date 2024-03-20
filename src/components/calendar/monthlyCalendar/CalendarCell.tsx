import { Dispatch, DragEvent, SetStateAction } from 'react';
import { Moment } from 'moment';
import styled, { css } from 'styled-components';
import HolidayLabel from './HolidayLabel';
import TaskLabel from './TaskLabel';
import { IBusyDate, ICalendarDate, ITask } from 'types/types';
import { reassignTask } from '../inlineManager/utils/inline-manager-utils';

interface IStyledCellProps {
  isRelevant: boolean;
  isToday: boolean;
  isSelected: boolean;
  isHovered: boolean;
}

const StyledDateCell = styled.div<IStyledCellProps>`
  padding: 0.3vw;
  border-radius: 0.2rem;
  min-height: 7vw;
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0 0 0.3rem #999;
  }
  ${(props) =>
    props.isRelevant
      ? css`
          background: #e2e2e2;
        `
      : css`
          background: #d3d3d3;
        `};
  ${(props) =>
    props.isToday &&
    css`
      border: 1px solid #555;
    `};
  ${(props) =>
    props.isSelected &&
    props.isRelevant &&
    css`
      box-shadow: 0 0 1rem #999;
    `}
  ${(props) =>
    props.isHovered
      ? css`
          box-shadow: 0 0 1rem #535353;
        `
      : css`
          box-shadow: none;
        `};
`;

const Date = styled.div`
  font-weight: 700;
  color: #555;
  display: inline-block;
`;

const Cards = styled.div`
  font-size: 0.9rem;
  color: #777;
  display: inline-block;
  margin-left: 0.5rem;
`;

type TCalendarCellProps = {
  date: ICalendarDate;
  onCellClick: (date: ICalendarDate) => void;
  selectedDate: Moment;
  hoveredDate: ICalendarDate | null;
  setHoveredDate: (value: ICalendarDate | null) => void;
  draggedTask: ITask | null;
  setBusyDates: Dispatch<SetStateAction<IBusyDate[]>>;
};

const CalendarCell = ({
  date,
  onCellClick,
  selectedDate,
  hoveredDate,
  setHoveredDate,
  draggedTask,
  setBusyDates,
}: TCalendarCellProps) => {
  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    setHoveredDate(null);
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>, date: ICalendarDate) => {
    e.preventDefault();
    setHoveredDate(date);
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, date: ICalendarDate) => {
    e.preventDefault();
    reassignTask(draggedTask, selectedDate, date.date, setBusyDates);
  };

  const isSelected = !!date.date && date.date === selectedDate.date();
  const isHovered = hoveredDate?.date === date.date && date.isRelevant && hoveredDate?.isRelevant;
  const dateCellProps = { ...date, isSelected, isHovered };

  return (
    <StyledDateCell
      onClick={() => onCellClick(date)}
      onDragLeave={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
      onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
      onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e, date)}
      onDragExit={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
      onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, date)}
      {...dateCellProps}
    >
      <Date>{date.date}</Date>
      {date.tasks.length === 1 && <Cards>{date.tasks.length} card</Cards>}
      {date.tasks.length > 1 && <Cards>{date.tasks.length} cards</Cards>}
      {date.holidayTitle && <HolidayLabel holiday={date.holidayTitle} />}
      {!!date.tasks.length && <TaskLabel tasks={date.tasks} />}
    </StyledDateCell>
  );
};

export default CalendarCell;
