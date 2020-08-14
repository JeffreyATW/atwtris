export default class Tetronimo {
  grid: number[][];
  rotation: 0 | 1 | 2 | 3;

  constructor() {
    this.rotation = 0;
  }

  canRotate(direction, x, y) {}

  getRotatedGrid() {
    return this.grid;
  }
}
