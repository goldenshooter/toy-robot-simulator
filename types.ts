export type FacingDirection = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

export interface Position {
  x: number;
  y: number;
  f: FacingDirection;
}
