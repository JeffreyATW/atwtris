import * as rotateMatrix from "rotate-matrix";
import Tetronimo from "./Tetronimo";

export default class Tetronimo4Rotations extends Tetronimo {
  getRotatedGrid() {
    return rotateMatrix(this.grid, this.rotation);
  }
}
