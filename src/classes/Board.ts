import Cell from "./Cell";
import Tetronimo from "./tetronimos/Tetronimo";
import S from "./tetronimos/S";
import Square from "./Square";

export default class Board {
  activeTetronimo?: {
    coords: [number, number];
    tetronimo: Tetronimo;
  };
  private grid: [Cell][];

  constructor() {
    this.grid = Array.apply(null, new Array(20)).map((i) =>
      Array.apply(null, new Array(10)).map((j) => new Cell())
    );
  }

  getGrid() {
    if (!this.activeTetronimo) {
      return this.grid;
    }
    const gridWithActiveTetronimo = [...this.grid].map((row) => [...row]);
    this.activeTetronimo.tetronimo.getRotatedGrid().forEach((row, i) => {
      row.forEach((col, j) => {
        if (col) {
          gridWithActiveTetronimo[this.activeTetronimo.coords[0] + i][
            this.activeTetronimo.coords[1] + j
          ] = new Cell(new Square());
        }
      });
    });
    return gridWithActiveTetronimo;
  }

  moveActiveTetronimo(direction) {
    if (this.activeTetronimo) {
      this.activeTetronimo.coords[1] += direction;
    }
  }

  setActiveTetronimo() {
    this.activeTetronimo = {
      coords: [0, 5],
      tetronimo: new S(),
    };
  }
}
