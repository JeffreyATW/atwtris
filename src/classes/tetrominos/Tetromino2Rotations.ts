import * as rotateMatrix from "rotate-matrix";
import Tetromino from "./Tetromino";

export default class Tetromino2Rotations extends Tetromino {
  getRotatedGrid(direction = 0) {
    return rotateMatrix(this.grid, (this.rotation + direction) % 2);
  }
}
