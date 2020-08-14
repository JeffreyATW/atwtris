import Tetromino from "./Tetromino";
import Tetromino2Rotations from "./Tetromino2Rotations";
import Tetromino4Rotations from "./Tetromino4Rotations";

export default class J extends Tetromino4Rotations {
  grid = [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  startingRow = 0;
}
