import { describe, expect, test } from 'vitest';
import ToyRobot from './toyRobot.ts';

describe('ToyRobot', () => {
  test('returns null from report before being placed', () => {
    const robot = new ToyRobot();

    expect(robot.report()).toBeNull();
  });

  test('ignores move before being placed', () => {
    const robot = new ToyRobot();

    robot.move();

    expect(robot.report()).toBeNull();
  });

  test('ignores left and right before being placed', () => {
    const robot = new ToyRobot();

    robot.left();
    robot.right();

    expect(robot.report()).toBeNull();
  });

  test('places the robot on a valid position', () => {
    const robot = new ToyRobot();

    robot.place(0, 0, 'NORTH');

    expect(robot.report()).toEqual({
      x: 0,
      y: 0,
      f: 'NORTH',
    });
  });

  test('ignores invalid placement', () => {
    const robot = new ToyRobot();

    robot.place(6, 6, 'NORTH');

    expect(robot.report()).toBeNull();
  });

  test('moves one step forward when the move is valid', () => {
    const robot = new ToyRobot();

    robot.place(0, 0, 'NORTH');
    robot.move();

    expect(robot.report()).toEqual({
      x: 0,
      y: 1,
      f: 'NORTH',
    });
  });

  test('should rotate the robot left', () => {
    const robot = new ToyRobot();

    robot.place(0, 0, 'NORTH');
    robot.left();

    expect(robot.report()).toEqual({ x: 0, y: 0, f: 'WEST' });
  });

  test('should rotate the robot right', () => {
    const robot = new ToyRobot();

    robot.place(0, 0, 'NORTH');
    robot.right();

    expect(robot.report()).toEqual({ x: 0, y: 0, f: 'EAST' });
  });

  test('should not move the robot off the table', () => {
    const robot = new ToyRobot();

    robot.place(0, 4, 'NORTH');
    robot.move();

    expect(robot.report()).toEqual({ x: 0, y: 4, f: 'NORTH' });
  });

  test('replaces the current position when PLACE is called again', () => {
    const robot = new ToyRobot();

    robot.place(0, 0, 'NORTH');
    robot.move();
    robot.place(2, 2, 'SOUTH');

    expect(robot.report()).toEqual({ x: 2, y: 2, f: 'SOUTH' });
  });

  test('supports the example sequence from the prompt', () => {
    const robot = new ToyRobot();

    robot.place(1, 2, 'EAST');
    robot.move();
    robot.move();
    robot.left();
    robot.move();

    expect(robot.report()).toEqual({ x: 3, y: 3, f: 'NORTH' });
  });
});
