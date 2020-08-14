import * as rotateMatrix from "rotate-matrix";
import Tetromino from "./Tetromino";

export default class Tetromino2Rotations extends Tetromino {
  getRotatedGrid() {
    return rotateMatrix(this.grid, this.rotation % 2);
  }
}
