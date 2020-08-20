import Tetromino from "./tetrominos/Tetromino";
import I from "./tetrominos/I";
import J from "./tetrominos/J";
import L from "./tetrominos/L";
import O from "./tetrominos/O";
import S from "./tetrominos/S";
import Z from "./tetrominos/Z";

export default class Queue {
  private queue: Tetromino[];

  constructor() {
    this.queue = [];
    for (let i = 0; i < 4; i += 1) {
      this.queue.push(new (Queue.getRandom())());
    }
  }

  static blocks = [I, J, L, O, S, Z];

  static getRandom() {
    const idx = Math.floor(Queue.blocks.length * Math.random());
    return Queue.blocks[idx];
  }

  pop() {
    this.queue.push(new (Queue.getRandom())());
    return this.queue.shift();
  }
}
