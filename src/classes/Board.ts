import Cell from "./Cell";
import Tetromino from "./tetrominos/Tetromino";
import S from "./tetrominos/S";
import Square from "./Square";
import IdleSquare from "./IdleSquare";

export default class Board {
  activeTetromino?: {
    tetromino: Tetromino;
    x: number;
    y: number;
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
          const gridRow = gridWithActiveTetromino[this.activeTetromino.y + i];
          if (gridRow) {
            const gridCol = gridRow[this.activeTetromino.x + j];
            if (gridCol) {
              gridRow[this.activeTetromino.x + j] = new Cell(
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
      this.activeTetromino.x += direction;
      return true;
    }
    return false;
  }

  softDropActiveTetromino() {
    if (this.activeTetromino) {
      if (this.canSoftDrop()) {
        this.activeTetromino.y += 1;
      } else {
        this.deactivateTetromino();
      }
      return true;
    }
    return false;
  }

  rotateActiveTetromino(direction) {
    if (this.activeTetromino) {
      const { tetromino, x, y } = this.activeTetromino;

      const rotatedGrid = tetromino.getRotatedGrid(direction);

      if (!this.doesTetrominoOverlap(rotatedGrid, x, y)) {
        this.activeTetromino.tetromino.rotation += direction;
        return true;
      }
      if (
        // try moving it up
        !this.doesTetrominoOverlap(rotatedGrid, x, y - 1)
      ) {
        this.activeTetromino.tetromino.rotation += direction;
        this.activeTetromino.y -= 1;
        return true;
      }
      if (
        // try moving it right
        x < 5 &&
        !this.doesTetrominoOverlap(rotatedGrid, x + 1, y)
      ) {
        this.activeTetromino.tetromino.rotation += direction;
        this.activeTetromino.x += 1;
        return true;
      }
      if (
        // try moving it left
        !this.doesTetrominoOverlap(rotatedGrid, x - 1, y)
      ) {
        this.activeTetromino.tetromino.rotation += direction;
        this.activeTetromino.x -= 1;
        return true;
      }
    }
    return false;
  }

  setActiveTetromino() {
    const tetromino = new S();
    const x = 4;
    const y = tetromino.startingRow;

    this.activeTetromino = {
      tetromino,
      x,
      y,
    };

    return !this.doesTetrominoOverlap(tetromino.getRotatedGrid(), x, y);
  }

  canMove(direction) {
    const { tetromino, x, y } = this.activeTetromino;

    return !this.doesTetrominoOverlap(
      tetromino.getRotatedGrid(),
      x + direction,
      y
    );
  }

  canSoftDrop() {
    const { tetromino, x, y } = this.activeTetromino;

    return !this.doesTetrominoOverlap(tetromino.getRotatedGrid(), x, y + 1);
  }

  doesTetrominoOverlap(grid, x, y) {
    for (let i = 0; i < grid.length; i += 1) {
      for (let j = 0; j < grid[i].length; j += 1) {
        if (grid[i][j]) {
          const row = this.grid[y + i];
          if (row) {
            const cell = row[x + j];
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
