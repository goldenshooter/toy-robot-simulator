import { createInterface } from 'readline';
import {
  formatReport,
  getNextPosition,
  isValidPosition,
  parsePlaceCommand,
  rotateLeft,
  rotateRight,
} from './helperFunctions.ts';
import type { FacingDirection, Position } from './types.ts';

class ToyRobot {
  private position: Position | null = null;

  constructor() {}

  // PLACE will place the toy robot on the table at position X,Y, facing NORTH, SOUTH, EAST, or WEST.
  place(x: number, y: number, f: FacingDirection): void {
    if (isValidPosition(x, y)) {
      this.position = { x, y, f };
    }
  }

  //MOVE will move the toy robot one unit forward in the direction it is currently facing.
  move(): void {
    if (!this.position) {
      console.log('Please place the robot on the table first using the PLACE command.');
      return;
    }

    const nextPosition = getNextPosition(this.position);

    if (!isValidPosition(nextPosition.x, nextPosition.y)) {
      console.log(
        'Invalid move, the robot will fall off the table. Please try a different command.',
      );
      return;
    }

    this.position = nextPosition;
  }

  // LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
  left(): void {
    if (!this.position) {
      console.log('Please place the robot on the table first using the PLACE command.');
      return;
    }

    this.position.f = rotateLeft(this.position.f);
  }

  right(): void {
    if (!this.position) {
      console.log('Please place the robot on the table first using the PLACE command.');
      return;
    }

    this.position.f = rotateRight(this.position.f);
  }

  // REPORT will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.
  report(): void {
    if (!this.position) {
      console.log('Please place the robot on the table first using the PLACE command.');
      return;
    }
    console.log(formatReport(this.position));
  }
}

const robot = new ToyRobot();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const handleCommand = (command: string) => {
  const line = command.trim().toUpperCase();

  if (line.startsWith('PLACE')) {
    const placePosition = parsePlaceCommand(line);

    if (placePosition) {
      robot.place(placePosition.x, placePosition.y, placePosition.f);
    } else {
      console.log('Invalid PLACE command, example: PLACE 0,0,NORTH');
    }
  } else if (line === 'MOVE') {
    robot.move();
  } else if (line === 'LEFT') {
    robot.left();
  } else if (line === 'RIGHT') {
    robot.right();
  } else if (line === 'REPORT') {
    robot.report();
  } else {
    console.log('Invalid command, please try again.');
  }
};

console.log('Welcome to the Toy Robot Simulator!');
rl.setPrompt('Enter command: ');
rl.prompt();

rl.on('line', (line) => {
  handleCommand(line);
  rl.prompt();
});

process.on('SIGINT', () => {
  rl.close();
});

rl.on('close', () => {
  console.log('Thank you for playing! Goodbye.');
  process.exit(0);
});
