import Tetromino from "./Tetromino";

export default class S extends Tetromino {
  grid = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ];

  startingCol = 3;
  startingRow = 0;
}
