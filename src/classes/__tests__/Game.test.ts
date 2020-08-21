import KEY_CODES from "../../constants/keyCodes";
import S from "../tetrominos/S";
import Game from "../Game";

describe("Game", () => {
  let game;
  let windowEventMap;
  beforeEach(() => {
    windowEventMap = {};
    window.addEventListener = jest.fn((event, cb) => {
      windowEventMap[event] = cb;
    });
    window.alert = jest.fn();
    window.setInterval = jest.fn();
    window.clearInterval = jest.fn();
    game = new Game();
  });

  describe("start", () => {
    beforeEach(() => {
      game.start();
    });

    describe("keydown", () => {
      test("unsets keyDownStep and sets currentKeyCode", () => {
        windowEventMap.keydown({ keyCode: 1 });

        expect(game.keyDownStep).toBeNull();
        expect(game.currentKeyCode).toBe(1);
      });
    });

    describe("keyup", () => {
      beforeEach(() => {
        game.keyDownStep = 1;
        game.currentKeyCode = 1;
      });

      test("unsets keyDownStep and currentKeyCode if keyup keyCode is same as currentKeyCode", () => {
        windowEventMap.keyup({ keyCode: 1 });

        expect(game.keyDownStep).toBeNull();
        expect(game.currentKeyCode).toBeNull();
      });

      test("does nothing if keyCode is different", () => {
        windowEventMap.keyup({ keyCode: 2 });

        expect(game.keyDownStep).toBe(1);
        expect(game.currentKeyCode).toBe(1);
      });
    });

    describe("update", () => {
      beforeEach(() => {
        game.root = {};
        game.loop = 1;
      });

      describe("with no activeTetromino", () => {
        test("sets root innerText if can set activeTetromino", () => {
          game.board.setActiveTetromino = jest.fn(() => true);

          game.update();

          expect(game.root.innerText).not.toBeUndefined();
        });

        test("clears update interval", () => {
          game.board.setActiveTetromino = jest.fn(() => false);

          game.update();

          expect(window.clearInterval).toHaveBeenCalledWith(game.loop);
        });
      });

      describe("with activeTetromino", () => {
        beforeEach(() => {
          game.board.setActiveTetromino(new S());
        });

        test("does nothing if no keys are held", () => {
          game.update();

          expect(game.root.innerText).toBeUndefined();
        });

        test("sets keyDownStep if null and a key is held", () => {
          game.step = 5;

          game.currentKeyCode = KEY_CODES.LEFT;

          game.update();

          expect(game.keyDownStep).toBe(5);
        });

        test("does not change the board if move key is held while keydown step is not a multiple of 6", () => {
          game.keyDownStep = 5;

          game.currentKeyCode = KEY_CODES.LEFT;

          game.update();

          expect(game.root.innerText).toBeUndefined();
        });

        describe("when keydown step minus game step is a multiple of 6", () => {
          beforeEach(() => {
            game.keyDownStep = 6;
          });

          test("tells board to move tetromino left if LEFT is held", () => {
            game.currentKeyCode = KEY_CODES.LEFT;

            const moveSpy = jest.spyOn(game.board, "move");

            game.update();

            expect(moveSpy).toHaveBeenCalledWith(-1);
          });

          test("tells board to move tetromino right if RIGHT is held", () => {
            game.currentKeyCode = KEY_CODES.RIGHT;

            const moveSpy = jest.spyOn(game.board, "move");

            game.update();

            expect(moveSpy).toHaveBeenCalledWith(1);
          });

          test("tells board to soft drop if DOWN is held", () => {
            game.currentKeyCode = KEY_CODES.DOWN;

            const softDropSpy = jest.spyOn(game.board, "softDrop");

            game.update();

            expect(softDropSpy).toHaveBeenCalled();
          });
        });

        test("tells board to rotate clockwise if X is pressed", () => {
          game.currentKeyCode = KEY_CODES.X;

          const rotateSpy = jest.spyOn(game.board, "rotate");

          game.update();

          expect(rotateSpy).toHaveBeenCalledWith(1);
        });

        test("tells board to rotate counterclockwise if Z is pressed", () => {
          game.currentKeyCode = KEY_CODES.Z;

          const rotateSpy = jest.spyOn(game.board, "rotate");

          game.update();

          expect(rotateSpy).toHaveBeenCalledWith(-1);
        });

        test("tells board to hard drop if UP is pressed", () => {
          game.currentKeyCode = KEY_CODES.UP;

          const hardDropSpy = jest.spyOn(game.board, "hardDrop");

          game.update();

          expect(hardDropSpy).toHaveBeenCalled();
        });

        test("does nothing if rotate or hard drop keys are held when keyDownStep does not equal gameStep", () => {
          game.keyDownStep = 1;

          game.currentKeyCode = KEY_CODES.UP;

          const hardDropSpy = jest.spyOn(game.board, "hardDrop");

          game.update();

          expect(hardDropSpy).not.toHaveBeenCalled();

          expect(game.root.innerText).toBeUndefined();
        });
      });
    });
  });
});
