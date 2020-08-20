import I from "../tetrominos/I";
import J from "../tetrominos/J";
import L from "../tetrominos/L";
import O from "../tetrominos/O";
import S from "../tetrominos/S";
import Z from "../tetrominos/Z";
import Board from "../Board";
import Cell from "../Cell";
import IdleSquare from "../IdleSquare";

describe("Board", () => {
  let board;
  beforeEach(() => {
    board = new Board();
  });

  describe("getGrid", () => {
    describe("with no active tetromino", () => {
      let grid;
      beforeEach(() => {
        grid = board.getGrid();
      });

      test("creates a 10x20 grid", () => {
        expect(grid.length).toBe(20);
        expect(grid[0].length).toBe(10);
      });

      test("each cell is empty", () => {
        grid.flat().forEach((cell) => {
          expect(cell.text()).toBe(" ");
        });
      });
    });

    describe("with active tetromino", () => {
      beforeEach(() => {
        board.setActiveTetromino(new S());
      });

      test("places Squares and GhostSquares in grid cells", () => {
        board
          .getGrid()
          .flat()
          .forEach((cell, i) => {
            if (i === 4 || i === 5 || i === 13 || i === 14) {
              expect(cell.text()).toBe("O");
            } else if (i === 184 || i === 185 || i === 193 || i === 194) {
              expect(cell.text()).toBe("☐");
            } else {
              expect(cell.text()).toBe(" ");
            }
          });
      });

      test("places IdleSquares in grid when deactivating", () => {
        board.activeTetromino.y = 18;

        board
          .getGrid(true)
          .flat()
          .forEach((cell, i) => {
            if (i === 184 || i === 185 || i === 193 || i === 194) {
              expect(cell.text()).toBe("X");
            } else {
              expect(cell.text()).toBe(" ");
            }
          });
      });

      test("does not render cells out of Y bounds", () => {
        board.activeTetromino.y = -1;

        board
          .getGrid()
          .flat()
          .forEach((cell, i) => {
            if (i === 3 || i === 4) {
              expect(cell.text()).toBe("O");
            } else if (i === 184 || i === 185 || i === 193 || i === 194) {
              expect(cell.text()).toBe("☐");
            } else {
              expect(cell.text()).toBe(" ");
            }
          });
      });

      test("does not render cells out of X bounds - also no ghost blocks", () => {
        board.activeTetromino.x = -1;

        board
          .getGrid()
          .flat()
          .forEach((cell, i) => {
            if (i === 0 || i === 1 || i === 10) {
              expect(cell.text()).toBe("O");
            } else {
              expect(cell.text()).toBe(" ");
            }
          });
      });

      test("does not render cells out of X and Y bounds - also no ghost blocks", () => {
        board.activeTetromino.x = -1;
        board.activeTetromino.y = -1;

        board
          .getGrid()
          .flat()
          .forEach((cell, i) => {
            if (i === 0) {
              expect(cell.text()).toBe("O");
            } else {
              expect(cell.text()).toBe(" ");
            }
          });
      });
    });
  });

  describe("deactivateTetromino", () => {
    test("deactivates activeTetromino and deletes it", () => {
      board.setActiveTetromino(new I());
      board.activeTetromino.y = 18;

      board.deactivateTetromino();

      board
        .getGrid()
        .flat()
        .forEach((cell, i) => {
          if (i === 193 || i === 194 || i === 195 || i === 196) {
            expect(cell.text()).toBe("X");
          } else {
            expect(cell.text()).toBe(" ");
          }
        });
    });
  });

  describe("move", () => {
    test("returns false if no activeTetromino", () => {
      expect(board.move()).toBe(false);
    });

    describe("with activeTetromino", () => {
      beforeEach(() => {
        board.setActiveTetromino(new O());
      });

      test("sets new activeTetromino.x and returns true", () => {
        expect(board.move(1)).toBe(true);

        expect(board.activeTetromino.x).toBe(5);
      });

      test("returns false if can't move", () => {
        board.activeTetromino.x = 9;

        expect(board.move(1)).toBe(false);
      });
    });
  });

  describe("softDrop", () => {
    test("returns false if no activeTetromino", () => {
      expect(board.softDrop()).toBe(false);
    });

    describe("with activeTetromino", () => {
      beforeEach(() => {
        board.setActiveTetromino(new Z());
      });

      test("increases Y by 1 if can drop", () => {
        expect(board.softDrop()).toBe(true);

        expect(board.activeTetromino.y).toBe(1);
      });

      test("deactivates tetromino if can't soft drop", () => {
        board.activeTetromino.y = 18;
        const deactivateSpy = jest.spyOn(board, "deactivateTetromino");

        expect(board.softDrop()).toBe(true);

        expect(deactivateSpy).toHaveBeenCalled();
      });
    });
  });

  describe("hardDrop", () => {
    test("returns false if no activeTetromino", () => {
      expect(board.hardDrop()).toBe(false);
    });

    describe("with activeTetromino", () => {
      beforeEach(() => {
        board.setActiveTetromino(new J());
      });

      test("sets Y to hardDropY and deactivates tetromino", () => {
        board.deactivateTetromino = jest.fn();

        expect(board.hardDrop()).toBe(true);

        expect(board.activeTetromino.y).toBe(18);
        expect(board.deactivateTetromino).toHaveBeenCalled();
      });
    });
  });

  describe("rotate", () => {
    test("returns false if no activeTetromino", () => {
      expect(board.rotate()).toBe(false);
    });

    describe("with activeTetromino", () => {
      beforeEach(() => {
        board.setActiveTetromino(new L());
      });

      test("increases rotation by direction", () => {
        expect(board.rotate(1)).toBe(true);

        expect(board.activeTetromino.tetromino.rotation).toBe(1);
      });

      test("moves tetromino up if it overlaps", () => {
        board.grid[1][4] = new Cell(new IdleSquare());

        expect(board.rotate(1)).toBe(true);

        expect(board.activeTetromino.tetromino.rotation).toBe(1);

        expect(board.activeTetromino.y).toBe(-2);
      });

      test("moves tetromino right if it cannot be moved up", () => {
        board.activeTetromino.x = -1;

        expect(board.rotate(1)).toBe(true);

        expect(board.activeTetromino.tetromino.rotation).toBe(1);

        expect(board.activeTetromino.x).toBe(0);
      });

      test("moves tetromino left if it cannot be moved right", () => {
        board.activeTetromino.x = 9;

        expect(board.rotate(1)).toBe(true);

        expect(board.activeTetromino.tetromino.rotation).toBe(1);

        expect(board.activeTetromino.x).toBe(8);
      });

      test("returns false if it cannot be moved up, left, or right", () => {
        board.activeTetromino.y = 0;

        board.grid[0][3] = new Cell(new IdleSquare());
        board.grid[0][4] = new Cell(new IdleSquare());
        board.grid[0][5] = new Cell(new IdleSquare());
        board.grid[1][2] = new Cell(new IdleSquare());
        board.grid[1][6] = new Cell(new IdleSquare());

        expect(board.rotate(1)).toBe(false);
      });
    });
  });
});
