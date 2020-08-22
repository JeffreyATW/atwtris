import * as rotateMatrix from "rotate-matrix";

export default class Tetromino {
  readonly grid: number[][];
  rotation = 0;
  readonly startingCol: number;
  readonly startingRow: number;

  getRotatedGrid(direction = 0) {
    return rotateMatrix(this.grid, this.rotation + direction);
  }
}
