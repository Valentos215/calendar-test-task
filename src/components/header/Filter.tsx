import styled from 'styled-components';
import searchLogo from 'assets/search.svg';
import { searchTextLength } from 'constants/constants';

const StyledFilter = styled.div`
  display: flex;
  flex-direction: row;
  width: 20vw;
  @media (max-width: 769px) {
    margin-top: 0.5rem;
    width: 35vw;
  }
`;

const StyledInput = styled.input`
  line-height: 1.5rem;
  font-size: 1rem;
  width: 100%;
  border-radius: 0.3rem;
  padding: 0 0.5rem;
`;

const StyledIcon = styled.img`
  height: 1.2rem;
  margin: 0 0.5rem;
`;

type TFilterProps = {
  filter: string;
  setFilter: (value: string) => void;
};

const Filter = ({ filter, setFilter }: TFilterProps) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.slice(0, searchTextLength));
  };
  return (
    <StyledFilter>
      <StyledInput value={filter} onChange={onInputChange} />
      <StyledIcon alt="search icon" src={searchLogo} />
    </StyledFilter>
  );
};

export default Filter;
