import Queue from "../Queue";
import Tetromino from "../tetrominos/Tetromino";

describe("Queue", () => {
  describe("pop", () => {
    test("returns random Tetromino", () => {
      const queue = new Queue();

      expect(queue.pop() instanceof Tetromino).toBe(true);
    });
  });
});
