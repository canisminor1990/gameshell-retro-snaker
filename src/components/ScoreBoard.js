import styled, { keyframes } from 'styled-components';

const ShowUp = keyframes`
  from {
    color: #DF9F24;
    transform: scale(2);
  }
  to {
    color: #154d6c;
     transform: scale(1);
  }
`;
const ScoreNum = styled.div`
  animation: 0.5s ${ShowUp};
  display: inline-block;
  font-size: ${({ gameover }) => (gameover ? '24px' : '8px')};
`;

const Restart = styled.div`
  color: #fff;
  font-size: 8px;
  position: absolute;
  bottom: -16px;
  span {
    color: #6ec2de;
  }
`;

const ScoreBoard = styled.div`
  background: #fff;
  border: 1px solid #154d6c;
  border-radius: 2px;
  position: absolute;
  line-height: 1;
  padding: ${({ gameover }) => (gameover ? '32px 4px' : '0 4px')};
  top: ${({ gameover }) => (gameover ? '72px' : '28px')};
  font-size: ${({ gameover }) => (gameover ? '16px' : '8px')};
  left: 50%;
  transform: translateX(-50%);
  color: #154d6c;
  display: flex;
  width: 160px;
  box-shadow: ${({ gameover }) =>
    gameover ? '0 10px 5px -5px rgba(0,0,0,.2)' : '0 2px 0 0 rgba(0,0,0,.2)'};
  height: ${({ gameover }) => (gameover ? '50px' : '20px')};
  flex-direction: ${({ gameover }) => (gameover ? 'column' : 'row')};
  justify-content: ${({ gameover }) => (gameover ? 'center' : 'space-between')};
  align-items: center;
  transition: all 1s ease;
  z-index: 10;
`;

export default ({ score, gameover }) => {
  return (
    <ScoreBoard gameover={gameover}>
      <span>{gameover ? 'GAME OVER' : 'score'}</span>
      <ScoreNum gameover={gameover} key={gameover ? 'gameover' : score}>
        {score}
      </ScoreNum>
      {gameover ? (
        <Restart>
          press <span>start</span> to restart
        </Restart>
      ) : null}
    </ScoreBoard>
  );
};
