import Cell from "./Cell";
import Tetromino from "./tetrominos/Tetromino";
import S from "./tetrominos/S";
import Square from "./Square";

export default class Board {
  activeTetromino?: {
    coords: [number, number];
    tetromino: Tetromino;
  };
  private grid: [Cell][];

  constructor() {
    this.grid = Array.apply(null, new Array(20)).map((i) =>
      Array.apply(null, new Array(10)).map((j) => new Cell())
    );
  }

  getGrid() {
    if (!this.activeTetromino) {
      return this.grid;
    }
    const gridWithActiveTetromino = [...this.grid].map((row) => [...row]);
    this.activeTetromino.tetromino.getRotatedGrid().forEach((row, i) => {
      row.forEach((col, j) => {
        if (col) {
          gridWithActiveTetromino[this.activeTetromino.coords[0] + i][
            this.activeTetromino.coords[1] + j
          ] = new Cell(new Square());
        }
      });
    });
    return gridWithActiveTetromino;
  }

  moveActiveTetromino(direction) {
    if (this.activeTetromino) {
      this.activeTetromino.coords[1] += direction;
    }
  }

  setActiveTetromino() {
    const tetromino = new S();

    this.activeTetromino = {
      coords: [tetromino.startingRow, 5],
      tetromino,
    };
  }
}
