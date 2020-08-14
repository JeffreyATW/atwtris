import Tetromino from "./Tetromino";
import Tetromino4Rotations from "./Tetromino4Rotations";

export default class L extends Tetromino4Rotations {
  grid = [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ];

  startingRow = 1;
}
