import styled from 'styled-components';

const PreloaderWrapper = styled.div`
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPreloader = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 0.5rem solid #fff;
  border-left-color: #e31837;
  border-top-color: #e31837;
  border-right-color: #e31837;
  animation: loader 1.3s linear infinite;
  @keyframes loader {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Preloader = () => {
  return (
    <PreloaderWrapper>
      <StyledPreloader />
    </PreloaderWrapper>
  );
};

export default Preloader;
