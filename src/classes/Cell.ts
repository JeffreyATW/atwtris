import Square from "./Square";

export default class Cell {
  contents?: Square;

  constructor(contents?) {
    this.contents = contents;
  }

  text() {
    if (this.contents) {
      return this.contents.text();
    }
    return " ";
  }
}
