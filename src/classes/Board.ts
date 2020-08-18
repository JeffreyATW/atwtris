import Cell from "./Cell";
import Tetromino from "./tetrominos/Tetromino";
import S from "./tetrominos/S";
import Square from "./Square";
import IdleSquare from "./IdleSquare";

export default class Board {
  activeTetromino?: {
    coords: [number, number];
    tetromino: Tetromino;
  };
  private grid: Cell[][];

  constructor() {
    this.grid = Array.apply(null, new Array(20)).map(() =>
      Array.apply(null, new Array(10)).map(() => new Cell())
    );
  }

  getGrid(deactivate = false) {
    if (!this.activeTetromino) {
      return this.grid;
    }
    const gridWithActiveTetromino = [...this.grid].map((row) => [...row]);
    this.activeTetromino.tetromino.getRotatedGrid().forEach((row, i) => {
      row.forEach((col, j) => {
        if (col) {
          const gridRow =
            gridWithActiveTetromino[this.activeTetromino.coords[0] + i];
          if (gridRow) {
            const gridCol = gridRow[this.activeTetromino.coords[1] + j];
            if (gridCol) {
              gridRow[this.activeTetromino.coords[1] + j] = new Cell(
                deactivate ? new IdleSquare() : new Square()
              );
            }
          }
        }
      });
    });
    return gridWithActiveTetromino;
  }

  deactivateTetromino() {
    this.grid = this.getGrid(true);
    delete this.activeTetromino;
  }

  moveActiveTetromino(direction) {
    if (this.activeTetromino && this.canMove(direction)) {
      this.activeTetromino.coords[1] += direction;
      return true;
    }
    return false;
  }

  softDropActiveTetromino() {
    if (this.activeTetromino) {
      if (this.canSoftDrop()) {
        this.activeTetromino.coords[0] += 1;
      } else {
        this.deactivateTetromino();
      }
      return true;
    }
    return false;
  }

  rotateActiveTetromino(direction) {
    if (this.activeTetromino) {
      const { coords, tetromino } = this.activeTetromino;

      const rotatedGrid = tetromino.getRotatedGrid(direction);

      if (!this.doesTetrominoOverlap(rotatedGrid, coords[0], coords[1])) {
        this.activeTetromino.tetromino.rotation += direction;
        return true;
      }
      if (
        // try moving it up
        !this.doesTetrominoOverlap(rotatedGrid, coords[0] - 1, coords[1])
      ) {
        this.activeTetromino.tetromino.rotation += direction;
        this.activeTetromino.coords[0] -= 1;
        return true;
      }
      if (
        // try moving it right
        coords[1] < 5 &&
        !this.doesTetrominoOverlap(rotatedGrid, coords[0], coords[1] + 1)
      ) {
        this.activeTetromino.tetromino.rotation += direction;
        this.activeTetromino.coords[1] += 1;
        return true;
      }
      if (
        // try moving it left
        !this.doesTetrominoOverlap(rotatedGrid, coords[0], coords[1] - 1)
      ) {
        this.activeTetromino.tetromino.rotation += direction;
        this.activeTetromino.coords[1] -= 1;
        return true;
      }
    }
    return false;
  }

  setActiveTetromino() {
    const tetromino = new S();

    this.activeTetromino = {
      coords: [tetromino.startingRow, 5],
      tetromino,
    };

    return true;
  }

  canMove(direction) {
    const { coords, tetromino } = this.activeTetromino;

    return !this.doesTetrominoOverlap(
      tetromino.getRotatedGrid(),
      coords[0],
      coords[1] + direction
    );
  }

  canSoftDrop() {
    const { coords, tetromino } = this.activeTetromino;

    return !this.doesTetrominoOverlap(
      tetromino.getRotatedGrid(),
      coords[0] + 1,
      coords[1]
    );
  }

  doesTetrominoOverlap(grid, x, y) {
    for (let i = 0; i < grid.length; i += 1) {
      for (let j = 0; j < grid[i].length; j += 1) {
        if (grid[i][j]) {
          const row = this.grid[x + i];
          if (row) {
            const cell = row[y + j];
            if (cell) {
              if (cell.contents) {
                // cell is taken
                return true;
              }
            } else {
              // out of column bounds
              return true;
            }
          } else {
            // out of row bounds
            return true;
          }
        }
      }
    }
    return false;
  }
}
