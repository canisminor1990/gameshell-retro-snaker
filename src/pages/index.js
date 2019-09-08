import { Component } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import Snake from "../components/Snake";
import Food from "../components/Food";
import ScoreBoard from "../components/ScoreBoard";
import Mask from "../components/Mask";
import Config from "../config";
import Sound from "react-sound";
import { getRandomCoordinates, getSkin, getSpeed } from "../utils";
import _ from "lodash";

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const GameshellBody = css`
    width: 320px;
    height: 240px;
    min-width: 320px;
    min-height: 240px;
    max-width: 320px;
    max-height: 240px;
    overflow: hidden;
    border-radius: 8px;
    background: #fff;
    font-family: "pixel";
    line-height: 1;
    font-size: 8px;
    color: #154d6c;
`;

const webviewBody = css`
    width: 100vw;
    height: 1000vh;
    font-family: "pixel";
    line-height: 1;
    font-size: 8px;
    color: #154d6c;
    background:#9cc4d1;
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: pixel;
    src: url('/font/pixel.ttf');
  }

  html {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: ${({ gameshell }) => gameshell ? "#000" : "#9cc4d1"};
  }

  
  body {
    ${({ gameshell }) => gameshell ? GameshellBody : webviewBody}
  }
`;

const View = styled.div`
  position: relative;
  width: 320px;
  height: 240px;
  background: #9cc4d1;
  position: relative;
  ${({ gameshell }) => gameshell ? null : css`
    left: calc(50vw - 160px);
    top: calc(50vh - 240px);
    &:before {
      display: block;
      position: absolute;
      content:"MADE BY CANIS MINOR :P";
      width: 100%;
      text-align: center;
      left:0;
      bottom: -180px;
      font-size: 12px;
    }
    &:after {
      display: block;
      position: absolute;
      content:"";
      background: url("./img/gameshell.png") no-repeat;
      background-size: 100%;
      width: 720px;
      height: 580px;
      top:-174px;
      left: -200px;
      z-index: 999;
    }
`}
`;

const Backgorund = styled.div`
  position: relative;
  width: 320px;
  height: 240px;
  background: url('./img/background.png') no-repeat;
  image-rendering: pixelated;
`;

const SnakeArea = styled.div`
  position: relative;
  width: ${Config.width * Config.size}px;
  height: ${Config.height * Config.size}px;
  position: absolute;
  top: 54px;
  left: 16px;
  overflow: hidden;
`;

/// /////////////////////////////////////////////
// App
/// /////////////////////////////////////////////

const initialState = () => ({
  gameover     : false,
  gameshell    : window.innerWidth < 744,
  soundEat     : Sound.status.STOPPED,
  soundGameOver: Sound.status.STOPPED,
  food         : getRandomCoordinates(),
  speed        : 1,
  direction    : "RIGHT",
  addScore     : 0,
  score        : 0,
  skins        : [getSkin(), getSkin()],
  snakeDots    : [[0, 0], [1, 0]]
});

class App extends Component {
  state = initialState();

  componentDidMount() {
    window.clock       = setInterval(this.moveSnake, getSpeed(this.state.speed));
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    if (this.state.gameover) {
      clearInterval(window.clock);
    } else {
      this.checkIfOutOfBorders();
      this.checkIfCollapsed();
      this.checkIfEat();
    }
  }

  onKeyDown = e => {
    e                   = e || window.event;
    const { direction } = this.state;
    switch (e.keyCode) {
      case Config.key.up:
        if (direction !== "DOWN") this.setState({ direction: "UP" });
        break;
      case Config.key.down:
        if (direction !== "UP") this.setState({ direction: "DOWN" });

        break;
      case Config.key.left:
        if (direction !== "RIGHT") this.setState({ direction: "LEFT" });
        break;
      case Config.key.right:
        if (direction !== "LEFT") this.setState({ direction: "RIGHT" });
        break;
      case Config.key.start:
        if (this.state.gameover) {
          this.setState({ gameover: false });
          setTimeout(this.onRestart, 2);
        }
        break;
      case Config.key.menu:
        window.closeAllWindows();
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 1, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 1, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 1];
        break;
      case "UP":
        head = [head[0], head[1] - 1];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({ snakeDots: dots });
  };

  checkIfOutOfBorders = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= Config.width || head[1] >= Config.height || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  };

  checkIfCollapsed = () => {
    let snake = [...this.state.snakeDots];
    let head  = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  };

  checkIfEat = () => {
    let { food, skins, score, snakeDots, speed } = this.state;
    let head                                     = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      skins.push(getSkin());
      score = score + snakeDots.length * speed;
      this.setState({
                      food    : this.getNewFood(),
                      skins,
                      score,
                      soundEat: Sound.status.PLAYING
                    });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  };

  getNewFood = () => {
    let food = getRandomCoordinates();
    if (_.includes(JSON.stringify(this.state.snakeDots), JSON.stringify(food)))
      food = this.getNewFood();
    return food;
  };

  enlargeSnake = () => {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
                    snakeDots: newSnake
                  });
  };

  increaseSpeed = () => {
    if (this.state.speed < 10) {
      this.setState({ speed: this.state.speed + 1 });
    }
    this.resetTimeout();
  };

  resetTimeout = gameover => {
    clearInterval(window.clock);
    window.clock = setInterval(this.moveSnake, gameover ? getSpeed(1) : getSpeed(this.state.speed));
  };

  onGameOver = () => {
    this.setState({ gameover: true, soundGameOver: Sound.status.PLAYING });
  };

  onRestart = () => {
    this.setState(initialState());
    this.resetTimeout();
  };

  render() {
    return (
      <>
        <GlobalStyle gameshell={this.state.gameshell}/>
        <View gameshell={this.state.gameshell}>
          <Backgorund>
            <ScoreBoard score={this.state.score} gameover={this.state.gameover}/>
            <Mask gameover={this.state.gameover}/>
            <SnakeArea>
              <Snake skins={this.state.skins} snakeDots={this.state.snakeDots}/>
              <Food key={this.state.score} dot={this.state.food}/>
            </SnakeArea>
          </Backgorund>
          <Sound
            url="./sound/eat.mp3"
            playStatus={this.state.soundEat}
            onFinishedPlaying={() => {
              this.setState({ soundEat: Sound.status.STOPPED });
            }}
          />
          <Sound
            url="./sound/gameover.mp3"
            playStatus={this.state.soundGameOver}
            onFinishedPlaying={() => {
              this.setState({ soundGameOver: Sound.status.STOPPED });
            }}
          />
          <Sound url="./sound/bgm.mp3" playStatus={Sound.status.PLAYING} volume={50} loop/>
        </View>
      </>
    );
  }
}

export default App;
