export default class Tetromino {
  grid: number[][];
  rotation: 0 | 1 | 2 | 3;
  startingRow: number;

  constructor() {
    this.rotation = 0;
  }

  canRotate(direction, x, y) {}

  getRotatedGrid() {
    return this.grid;
  }
}
