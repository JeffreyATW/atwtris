export default class Tetromino {
  protected grid: number[][];
  rotation: number;
  startingRow: number;

  constructor() {
    this.rotation = 0;
  }

  getRotatedGrid(direction = 0) {
    return this.grid;
  }
}
