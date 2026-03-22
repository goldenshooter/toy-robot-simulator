import { createInterface } from 'readline';
import { formatReport, parsePlaceCommand } from './helperFunctions.ts';
import ToyRobot from './toyRobot.ts';

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
    return;
  }

  switch (line) {
    case 'MOVE':
      robot.move();
      break;
    case 'LEFT':
      robot.left();
      break;
    case 'RIGHT':
      robot.right();
      break;
    case 'REPORT': {
      const latestPosition = robot.report();
      if (latestPosition) {
        console.log(formatReport(latestPosition));
      }
      break;
    }
    default:
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
