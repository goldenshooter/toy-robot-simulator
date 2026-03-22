import { getNextPosition, isValidPosition, rotateLeft, rotateRight } from './helperFunctions.ts';
import type { FacingDirection, Position } from './types.ts';

class ToyRobot {
  private position: Position | null = null;

  // PLACE will place the toy robot on the table at position X,Y, facing NORTH, SOUTH, EAST, or WEST.
  place(x: number, y: number, f: FacingDirection): void {
    if (isValidPosition(x, y)) {
      this.position = { x, y, f };
    }
  }

  //MOVE will move the toy robot one unit forward in the direction it is currently facing.
  move(): void {
    if (!this.position) return;

    const nextPosition = getNextPosition(this.position);

    if (!isValidPosition(nextPosition.x, nextPosition.y)) return;

    this.position = nextPosition;
  }

  // LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
  left(): void {
    if (!this.position) return;

    this.position.f = rotateLeft(this.position.f);
  }

  right(): void {
    if (!this.position) return;

    this.position.f = rotateRight(this.position.f);
  }

  // report will return the current position.
  report(): Position | null {
    if (!this.position) return null;

    return this.position;
  }
}

export default ToyRobot;
