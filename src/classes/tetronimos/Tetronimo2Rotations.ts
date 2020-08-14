import * as rotateMatrix from "rotate-matrix";
import Tetronimo from "./Tetronimo";

export default class Tetronimo2Rotations extends Tetronimo {
  getRotatedGrid() {
    return rotateMatrix(this.grid, this.rotation % 2);
  }
}
