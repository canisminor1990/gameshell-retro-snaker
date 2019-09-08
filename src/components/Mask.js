import styled, { keyframes } from 'styled-components';

const ShowUp = keyframes`
from {
    opacity: 0;
    background: red;
  }

  to {
    opacity: 1;
    background: rgba(0,0,0,.5);
  }
`;

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
  animation: 0.5s ${ShowUp} ease-out 1;
`;

export default ({ gameover }) => {
  return gameover ? <Mask gameover={gameover} /> : <></>;
};
