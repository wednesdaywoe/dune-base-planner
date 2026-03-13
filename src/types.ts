// Core dimensions matching Dune Awakening's building system
export const UNIT_SIZE = 4;
export const WALL_HEIGHT = 3;
export const HALF_WALL_HEIGHT = 1.5;
export const FOUNDATION_HEIGHT = 0.2;
export const TRIANGLE_APOTHEM = UNIT_SIZE / (2 * Math.sqrt(3)); // ~1.1547
export const TRIANGLE_RADIUS = UNIT_SIZE / Math.sqrt(3); // ~2.3094
export const CURVE_RADIUS = UNIT_SIZE;

export type BuildingCategory = 'foundation' | 'wall' | 'roof' | 'incline' | 'structure';

export interface BlockDefinition {
  id: string;
  label: string;
  category: BuildingCategory;
  color: string;
  geometry:
    | { type: 'box'; args: [number, number, number] }
    | { type: 'wedge'; args: [number, number, number] }
    | { type: 'cylinder'; args: [number, number, number, number] }
    | { type: 'triangle'; sideLength: number; height: number }
    | { type: 'curved'; radius: number; height: number; thickness: number };
  gridFootprint: [number, number, number]; // [x, y, z] in grid units
  rotationIncrement: number; // degrees per rotation step
}

export interface PlacedBlock {
  id: string;
  type: string;
  position: [number, number, number];
  rotation: number; // degrees
}

export type InteractionMode = 'place' | 'delete';
