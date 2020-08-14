import Tetromino from "./Tetromino";
import Tetromino2Rotations from "./Tetromino2Rotations";

export default class S extends Tetromino2Rotations {
  grid = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ];

  startingRow = 0;
}
