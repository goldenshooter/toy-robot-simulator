import type { FacingDirection, Position } from './types.ts';

export const VALID_FACING_DIRECTIONS: FacingDirection[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

export function isValidPosition(x: number, y: number): boolean {
  return x >= 0 && x < 5 && y >= 0 && y < 5;
}

export function parsePlaceCommand(command: string): Position | null {
  const line = command.trim().toUpperCase();

  if (!line.startsWith('PLACE')) {
    return null;
  }

  const payload = line.slice(6);
  const [xStr, yStr, fStr] = payload.split(',');
  const x = Number(xStr);
  const y = Number(yStr);
  const f = fStr as FacingDirection;

  if (
    Number.isInteger(x) &&
    Number.isInteger(y) &&
    VALID_FACING_DIRECTIONS.includes(f) &&
    isValidPosition(x, y)
  ) {
    return { x, y, f };
  }

  return null;
}

export function getNextPosition(position: Position): Position {
  const { x, y, f } = position;

  switch (f) {
    case 'NORTH':
      return { x, y: y + 1, f };
    case 'EAST':
      return { x: x + 1, y, f };
    case 'SOUTH':
      return { x, y: y - 1, f };
    case 'WEST':
      return { x: x - 1, y, f };
  }
}

export function rotateLeft(facing: FacingDirection): FacingDirection {
  switch (facing) {
    case 'NORTH':
      return 'WEST';
    case 'EAST':
      return 'NORTH';
    case 'SOUTH':
      return 'EAST';
    case 'WEST':
      return 'SOUTH';
  }
}

export function rotateRight(facing: FacingDirection): FacingDirection {
  switch (facing) {
    case 'NORTH':
      return 'EAST';
    case 'EAST':
      return 'SOUTH';
    case 'SOUTH':
      return 'WEST';
    case 'WEST':
      return 'NORTH';
  }
}

export function formatReport(position: Position): string {
  return `Output: ${position.x},${position.y},${position.f}`;
}
