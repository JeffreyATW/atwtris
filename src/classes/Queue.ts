import Tetromino from "./tetrominos/Tetromino";
import I from "./tetrominos/I";
import J from "./tetrominos/J";
import L from "./tetrominos/L";
import O from "./tetrominos/O";
import S from "./tetrominos/S";
import T from "./tetrominos/T";
import Z from "./tetrominos/Z";

export default class Queue {
  readonly tetrominos: Tetromino[];

  constructor() {
    this.tetrominos = [];
    for (let i = 0; i < 4; i += 1) {
      this.tetrominos.push(new (Queue.getRandom())());
    }
  }

  static blocks = [I, J, L, O, S, T, Z];

  static getRandom() {
    const idx = Math.floor(Queue.blocks.length * Math.random());
    return Queue.blocks[idx];
  }

  pop() {
    this.tetrominos.push(new (Queue.getRandom())());
    return this.tetrominos.shift();
  }
}
