import Board from "../classes/Board";
import Queue from "../classes/Queue";
import KEY_CODES from "../constants/keyCodes";
import Cell from "./Cell";
import Square from "./Square";

export default class Game {
  currentKeyCode: number;
  keyDownStep: number;
  step: number;
  elements: {
    [index: string]: HTMLElement;
  };
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
    let boardChanged = false;
    let queueChanged = false;
    if (this.board.activeTetromino) {
      if (Game.actionKeys.includes(this.currentKeyCode)) {
        if (this.keyDownStep === null) {
          this.keyDownStep = this.step;
        }
        if (Game.directionalKeys.includes(this.currentKeyCode)) {
          if ((this.step - this.keyDownStep) % 6 === 0) {
            if (Game.moveKeys.includes(this.currentKeyCode)) {
              boardChanged = this.board.move(
                this.currentKeyCode === KEY_CODES.LEFT ? -1 : 1
              );
            } else {
              boardChanged = this.board.softDrop();
            }
          }
        } else if (this.keyDownStep === this.step) {
          if (Game.rotateKeys.includes(this.currentKeyCode)) {
            boardChanged = this.board.rotate(
              this.currentKeyCode === KEY_CODES.Z ? -1 : 1
            );
          } else {
            boardChanged = this.board.hardDrop();
          }
        }
      }
    } else {
      if (this.board.setActiveTetromino(this.queue.pop())) {
        boardChanged = true;
        queueChanged = true;
      } else {
        alert("Game over!");
        clearInterval(this.loop);
      }
    }

    if (boardChanged) {
      let boardText = "";

      const grid = this.board.getGrid();
      grid.forEach((row, i) => {
        if (i === 0) {
          boardText += "_";
          row.forEach(() => {
            boardText += "_";
          });
          boardText += "_\n";
        }
        boardText += "|";
        row.forEach((cell) => {
          boardText += cell.text();
        });
        boardText += "|\n";
        if (i === grid.length - 1) {
          boardText += "‾";
          row.forEach(() => {
            boardText += "‾";
          });
          boardText += "‾";
        }
      });

      this.elements.board.innerText = boardText;
    }

    if (queueChanged) {
      let queueText = "_NEXT_\n";

      this.queue.tetrominos.forEach((tetromino, i) => {
        let padRow = tetromino.grid.length < 4 && tetromino.startingRow > -1;
        for (let j = 0; j <= 4; j += 1) {
          let lastRow = i === 3 && j === 4;
          if (!lastRow) {
            queueText += "|";
          }
          const actualJ = padRow ? j - 1 : j;
          for (let k = 0; k < 4; k += 1) {
            const actualK = tetromino.grid[0].length < 3 ? k - 1 : k;
            if (j === 0 && padRow) {
              queueText += " ";
            } else if (tetromino.grid[actualJ]) {
              const cell = new Cell(
                tetromino.grid[actualJ][actualK] ? new Square() : undefined
              );
              queueText += cell.text();
            } else if (!lastRow) {
              queueText += j === 4 ? "-" : " ";
            }
          }
          if (!lastRow) {
            queueText += "|\n";
          }
        }
      });

      for (let i = 0; i < 6; i += 1) {
        queueText += "‾";
      }

      this.elements.queue.innerText = queueText;
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

    this.elements = {};
    this.elements.board = document.getElementById("board");
    this.elements.queue = document.getElementById("queue");

    this.loop = setInterval(this.update, 1000 / 60);
  };
}
