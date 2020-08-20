import Board from "../classes/Board";
import Queue from "../classes/Queue";
import KEY_CODES from "../constants/keyCodes";

export default class Game {
  currentKeyCode: number;
  keyDownStep: number;
  step: number;
  root: HTMLElement;
  board: Board;
  queue: Queue;
  loop: NodeJS.Timeout;

  static moveKeys = [KEY_CODES.LEFT, KEY_CODES.RIGHT];

  static directionalKeys = [...Game.moveKeys, KEY_CODES.DOWN];

  static rotateKeys = [KEY_CODES.Z, KEY_CODES.X];

  static actionKeys = [
    ...Game.directionalKeys,
    ...Game.rotateKeys,
    KEY_CODES.UP,
  ];

  update = () => {
    let changed = false;
    if (this.board.activeTetromino) {
      if (Game.actionKeys.includes(this.currentKeyCode)) {
        if (this.keyDownStep === null) {
          this.keyDownStep = this.step;
        }
        if (Game.directionalKeys.includes(this.currentKeyCode)) {
          if ((this.step - this.keyDownStep) % 6 === 0) {
            if (Game.moveKeys.includes(this.currentKeyCode)) {
              changed = this.board.move(
                this.currentKeyCode === KEY_CODES.LEFT ? -1 : 1
              );
            } else {
              changed = this.board.softDrop();
            }
          }
        } else if (this.keyDownStep === this.step) {
          if (Game.rotateKeys.includes(this.currentKeyCode)) {
            changed = this.board.rotate(
              this.currentKeyCode === KEY_CODES.Z ? -1 : 1
            );
          } else {
            changed = this.board.hardDrop();
          }
        }
      }
    } else {
      if (this.board.setActiveTetromino(this.queue.pop())) {
        changed = true;
      } else {
        alert("Game over!");
        clearInterval(this.loop);
      }
    }

    if (changed) {
      let innerText = "";

      const grid = this.board.getGrid();
      grid.forEach((row, i) => {
        if (i === 0) {
          innerText += "_";
          row.forEach(() => {
            innerText += "_";
          });
          innerText += "_\n";
        }
        innerText += "|";
        row.forEach((cell) => {
          innerText += cell.text();
        });
        innerText += "|\n";
        if (i === grid.length - 1) {
          innerText += "‾";
          row.forEach(() => {
            innerText += "‾";
          });
          innerText += "‾";
        }
      });

      this.root.innerText = innerText;
    }
    this.step += 1;
  };

  start = () => {
    this.board = new Board();
    this.queue = new Queue();

    this.currentKeyCode = null;
    this.keyDownStep = null;
    this.step = 0;

    window.addEventListener("keydown", (event) => {
      this.keyDownStep = null;
      this.currentKeyCode = event.keyCode;
    });

    window.addEventListener("keyup", (event) => {
      if (this.currentKeyCode === event.keyCode) {
        this.keyDownStep = null;
        this.currentKeyCode = null;
      }
    });

    this.root = document.querySelector("pre");

    this.loop = setInterval(this.update, 1000 / 60);
  };
}
