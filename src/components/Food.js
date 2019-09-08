import styled,{keyframes} from "styled-components";
import Config from '../config'

const ShowUp = keyframes`
from {
    transform: scale(2) translateY(-10px);
  }

  to {
    transform: scale(1) translateY(0);
  }
`

const SnakeFood = styled.div`
  position: absolute;
    width: ${Config.size}px;
    height: ${Config.size}px;
    background: url("./img/coin.png");
    z-index: 2;
    animation: ${ShowUp} .5s ease 1;
    image-rendering: pixelated;
`

export default (props) => {

  const style = {
    left: `${props.dot[0]*Config.size}px`,
    top: `${props.dot[1]*Config.size}px`
  }

  return (
    <SnakeFood style={style}></SnakeFood>
  )
}