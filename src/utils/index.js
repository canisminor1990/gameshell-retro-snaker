import Config from '../config';

export const getRandomCoordinates = () => {
  let min = 1;
  let xMax = Config.width;
  let yMax = Config.height;
  let x = Math.floor(Math.random() * (xMax - min) + min);
  let y = Math.floor(Math.random() * (yMax - min) + min);
  return [x, y];
};

export const getSkin = () => Math.floor(Math.random() * (6 - 1) + 1);

export const getSpeed = speed => {
  return 200 - speed * 5;
};
