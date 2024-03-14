import { Moment } from 'moment';
import styled, { css } from 'styled-components';
import { ICalendarDate } from 'types/types';
import HolidayLabel from './HolidayLabel';
import TaskLabel from './TaskLabel';

interface IStyledCellProps {
  isRelevant: boolean;
  isToday: boolean;
  isSelected: boolean;
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
};

const CalendarCell = ({ date, onCellClick, selectedDate }: TCalendarCellProps) => {
  const isSelected = !!date.date && date.date === selectedDate.date();
  const props = { ...date, isSelected };

  return (
    <StyledDateCell onClick={() => onCellClick(date)} {...props}>
      <Date>{date.date}</Date>
      {date.tasks.length === 1 && <Cards>{date.tasks.length} card</Cards>}
      {date.tasks.length > 1 && <Cards>{date.tasks.length} cards</Cards>}
      {date.holidayTitle && <HolidayLabel holiday={date.holidayTitle} />}
      {!!date.tasks.length && <TaskLabel tasks={date.tasks} />}
    </StyledDateCell>
  );
};

export default CalendarCell;
