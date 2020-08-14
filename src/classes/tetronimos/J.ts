import Tetronimo from "./Tetronimo";
import Tetronimo2Rotations from "./Tetronimo2Rotations";
import Tetronimo4Rotations from "./Tetronimo4Rotations";

export default class J extends Tetronimo4Rotations {
  grid = [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];
}
