import Board from "./classes/Board";
import KEY_CODES from "./constants/keyCodes";

const board = new Board();

let currentKeyCode = null;
let keyDownStep = 0;

let gameStep = 0;

window.addEventListener("keydown", (event) => {
  keyDownStep = 0;
  currentKeyCode = event.keyCode;
});

window.addEventListener("keyup", (event) => {
  if (currentKeyCode === event.keyCode) {
    keyDownStep = 0;
    currentKeyCode = null;
  }
});

const root = document.querySelector("pre");

const moveKeys = [KEY_CODES.LEFT, KEY_CODES.RIGHT];

const directionalKeys = [...moveKeys, KEY_CODES.DOWN];

const rotateKeys = [KEY_CODES.Z, KEY_CODES.X];

const actionKeys = [...directionalKeys, ...rotateKeys];

const updateGame = () => {
  let changed = false;
  if (board.activeTetromino) {
    if (actionKeys.includes(currentKeyCode)) {
      if (keyDownStep === 0) {
        keyDownStep = gameStep;
      }
      if (directionalKeys.includes(currentKeyCode)) {
        if ((gameStep - keyDownStep) % 6 === 0) {
          if (moveKeys.includes(currentKeyCode)) {
            changed = board.moveActiveTetromino(
              currentKeyCode === KEY_CODES.LEFT ? -1 : 1
            );
          } else if (currentKeyCode === KEY_CODES.DOWN) {
            changed = board.softDropActiveTetromino();
          }
        }
      } else if (rotateKeys.includes(currentKeyCode)) {
        if (keyDownStep === gameStep) {
          changed = board.rotateActiveTetromino(
            currentKeyCode === KEY_CODES.Z ? -1 : 1
          );
        }
      }
    }
  } else {
    if (board.setActiveTetromino()) {
      changed = true;
    } else {
      alert("Game over!");
      clearInterval(loop);
    }
  }

  if (changed) {
    let innerText = "";

    const grid = board.getGrid();
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

    root.innerText = innerText;
  }
  gameStep += 1;
};

const loop = setInterval(updateGame, 1000 / 60);
