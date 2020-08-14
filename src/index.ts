import Board from "./classes/Board";
import KEY_CODES from "./constants/keyCodes";

const board = new Board();

let currentKeyCode = null;
let blockImmediatelyMoved = false;

let gameStep = 0;

window.addEventListener("keydown", (event) => {
  currentKeyCode = event.keyCode;
});

window.addEventListener("keyup", (event) => {
  if (currentKeyCode === event.keyCode) {
    currentKeyCode = null;
  }
});

const root = document.createElement("pre");
document.body.append(root);

const updateGame = () => {
  if (board.activeTetromino) {
    if (
      currentKeyCode === KEY_CODES.LEFT ||
      currentKeyCode === KEY_CODES.RIGHT
    ) {
      blockImmediatelyMoved = true;
      if (gameStep % 20 === 0) {
        board.moveActiveTetromino(currentKeyCode === KEY_CODES.LEFT ? -1 : 1);
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
