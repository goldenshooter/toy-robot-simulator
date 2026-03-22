import { describe, expect, test } from 'vitest';
import {
  formatReport,
  getNextPosition,
  isValidPosition,
  parsePlaceCommand,
  rotateLeft,
  rotateRight,
} from './helperFunctions.ts';

describe('helper functions', () => {
  test('parsePlaceCommand parses valid PLACE command', () => {
    expect(parsePlaceCommand('PLACE 1,2,EAST')).toEqual({
      x: 1,
      y: 2,
      f: 'EAST',
    });
  });

  test('parsePlaceCommand returns null for invalid command', () => {
    expect(parsePlaceCommand('PLACE 7,2,EAST')).toBeNull();
    expect(parsePlaceCommand('MOVE')).toBeNull();
  });

  test('isValidPosition validates table bounds', () => {
    expect(isValidPosition(0, 0)).toBe(true);
    expect(isValidPosition(4, 4)).toBe(true);
    expect(isValidPosition(-1, 0)).toBe(false);
    expect(isValidPosition(5, 0)).toBe(false);
    expect(isValidPosition(0, 5)).toBe(false);
  });

  test('getNextPosition moves based on facing direction', () => {
    expect(getNextPosition({ x: 0, y: 0, f: 'NORTH' })).toEqual({
      x: 0,
      y: 1,
      f: 'NORTH',
    });
    expect(getNextPosition({ x: 0, y: 0, f: 'EAST' })).toEqual({
      x: 1,
      y: 0,
      f: 'EAST',
    });
    expect(getNextPosition({ x: 1, y: 1, f: 'SOUTH' })).toEqual({
      x: 1,
      y: 0,
      f: 'SOUTH',
    });
    expect(getNextPosition({ x: 1, y: 1, f: 'WEST' })).toEqual({
      x: 0,
      y: 1,
      f: 'WEST',
    });
  });

  test('rotateLeft rotates correctly', () => {
    expect(rotateLeft('NORTH')).toBe('WEST');
    expect(rotateLeft('WEST')).toBe('SOUTH');
    expect(rotateLeft('SOUTH')).toBe('EAST');
    expect(rotateLeft('EAST')).toBe('NORTH');
  });

  test('rotateRight rotates correctly', () => {
    expect(rotateRight('NORTH')).toBe('EAST');
    expect(rotateRight('EAST')).toBe('SOUTH');
    expect(rotateRight('SOUTH')).toBe('WEST');
    expect(rotateRight('WEST')).toBe('NORTH');
  });

  test('formatReport returns expected output', () => {
    expect(formatReport({ x: 3, y: 3, f: 'NORTH' })).toBe('Output: 3,3,NORTH');
  });
});
