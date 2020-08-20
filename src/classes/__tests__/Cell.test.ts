import Cell from "../Cell";
import Square from "../Square";

describe("Cell", () => {
  describe("text", () => {
    test("returns contents.text if provided", () => {
      const cell = new Cell(new Square());

      expect(cell.text()).toEqual("O");
    });

    test("returns space if not provided", () => {
      const cell = new Cell();

      expect(cell.text()).toEqual(" ");
    });
  });
});
