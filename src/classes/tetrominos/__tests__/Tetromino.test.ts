import Tetromino from "../Tetromino";

class MockTetromino extends Tetromino {
  grid = [
    [1, 0],
    [0, 0],
  ];
}

describe("Tetromino", () => {
  describe("getRotatedGrid", () => {
    let tetromino;
    beforeEach(() => {
      tetromino = new MockTetromino();
    });

    test("returns grid with no arguments", () => {
      expect(tetromino.getRotatedGrid()).toEqual(tetromino.grid);
    });

    test("returns 90 degree grid with rotation = 1", () => {
      expect(tetromino.getRotatedGrid(1)).toEqual([
        [0, 1],
        [0, 0],
      ]);
    });

    test("returns 180 degree grid with rotation = 2", () => {
      expect(tetromino.getRotatedGrid(2)).toEqual([
        [0, 0],
        [0, 1],
      ]);
    });

    test("returns 270 degree grid with rotation = 3", () => {
      expect(tetromino.getRotatedGrid(3)).toEqual([
        [0, 0],
        [1, 0],
      ]);
    });
  });
});
