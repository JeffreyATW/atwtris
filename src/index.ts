import Board from "./classes/Board";
import KEY_CODES from "./constants/keyCodes";

const board = new Board();

let currentKeyCode = null;
let immediateMoveTime = 0;

let gameStep = 0;

window.addEventListener("keydown", (event) => {
  currentKeyCode = event.keyCode;
});

window.addEventListener("keyup", (event) => {
  if (currentKeyCode === event.keyCode) {
    currentKeyCode = null;
    immediateMoveTime = 0;
  }
});

const root = document.createElement("pre");
document.body.append(root);

const updateGame = () => {
  if (board.activeTetromino) {
    if (
      currentKeyCode === KEY_CODES.LEFT ||
      currentKeyCode === KEY_CODES.RIGHT ||
      currentKeyCode === KEY_CODES.DOWN
    ) {
      if (immediateMoveTime === 0) {
        immediateMoveTime = gameStep;
      }
      if ((gameStep - immediateMoveTime) % 6 === 0) {
        if (
          currentKeyCode === KEY_CODES.LEFT ||
          currentKeyCode === KEY_CODES.RIGHT
        ) {
          board.moveActiveTetromino(currentKeyCode === KEY_CODES.LEFT ? -1 : 1);
        } else if (currentKeyCode === KEY_CODES.DOWN) {
          board.softDropActiveTetromino();
        }
      }
    }
  } else {
    board.setActiveTetromino();
  }

  let innerText = "";

  board.getGrid().forEach((row) => {
    row.forEach((cell) => {
      innerText += cell.text();
    });
    innerText += "\n";
  });

  root.innerText = innerText;
  gameStep += 1;
};

const loop = setInterval(updateGame, 1000 / 60);
