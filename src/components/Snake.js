import styled, { keyframes } from "styled-components";
import Config from '../config'

const ShowUp = keyframes`
from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`

const SnakeDot = styled.div`
    position: absolute;
    width: ${Config.size}px;
    height: ${Config.size}px;
    z-index: 1;
    animation: ${ShowUp} .2s ease 1;
    image-rendering: pixelated;
`


export default ({snakeDots,skins}) => {
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const style = {
          background: `url("./img/snake_${skins[i]}.png")`,
          left:`${dot[0]*Config.size}px`,
          top:`${dot[1]*Config.size}px`
        }
        return (
          <SnakeDot key={i} style={style} />
        )
      })}
    </div>
  )
}