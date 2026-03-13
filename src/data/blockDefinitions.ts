import type { BlockDefinition } from '../types';
import {
  UNIT_SIZE,
  WALL_HEIGHT,
  HALF_WALL_HEIGHT,
  FOUNDATION_HEIGHT,
  CURVE_RADIUS,
} from '../types';

export const blockDefinitions: BlockDefinition[] = [
  // ── Foundations ──────────────────────────────────────────────
  {
    id: 'square_foundation',
    label: 'Square Foundation',
    category: 'foundation',
    color: '#7c7c7c',
    geometry: { type: 'box', args: [UNIT_SIZE, FOUNDATION_HEIGHT, UNIT_SIZE] },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },
  {
    id: 'triangle_foundation',
    label: 'Triangle Foundation',
    category: 'foundation',
    color: '#7c7c7c',
    geometry: { type: 'triangle', sideLength: UNIT_SIZE, height: FOUNDATION_HEIGHT },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 60,
  },
  {
    id: 'triangle_foundation_2',
    label: 'Triangle Foundation (Alt)',
    category: 'foundation',
    color: '#7c7c7c',
    geometry: { type: 'triangle', sideLength: UNIT_SIZE, height: FOUNDATION_HEIGHT },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 60,
  },
  {
    id: 'curved_foundation',
    label: 'Curved Foundation',
    category: 'foundation',
    color: '#7c7c7c',
    geometry: { type: 'curved', radius: CURVE_RADIUS, height: FOUNDATION_HEIGHT, thickness: 0.2 },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },

  // ── Structures (raised platform foundations, WALL_HEIGHT tall) ──
  {
    id: 'square_structure',
    label: 'Square Structure',
    category: 'structure',
    color: '#6d6d6d',
    geometry: { type: 'box', args: [UNIT_SIZE, WALL_HEIGHT, UNIT_SIZE] },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },
  {
    id: 'triangle_structure',
    label: 'Triangle Structure',
    category: 'structure',
    color: '#6d6d6d',
    geometry: { type: 'triangle', sideLength: UNIT_SIZE, height: WALL_HEIGHT },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 60,
  },
  {
    id: 'curved_structure',
    label: 'Curved Structure',
    category: 'structure',
    color: '#6d6d6d',
    geometry: { type: 'curved', radius: CURVE_RADIUS, height: WALL_HEIGHT, thickness: 0.2 },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },

  // ── Walls ───────────────────────────────────────────────────
  {
    id: 'wall',
    label: 'Wall',
    category: 'wall',
    color: '#8a6e4b',
    geometry: { type: 'box', args: [UNIT_SIZE, WALL_HEIGHT, 0.2] },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },
  {
    id: 'half_wall',
    label: 'Half Wall',
    category: 'wall',
    color: '#8a6e4b',
    geometry: { type: 'box', args: [UNIT_SIZE, HALF_WALL_HEIGHT, 0.2] },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },
  {
    id: 'window_wall',
    label: 'Window Wall',
    category: 'wall',
    color: '#5a4e3b',
    geometry: { type: 'box', args: [UNIT_SIZE, WALL_HEIGHT, 0.2] },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },
  {
    id: 'doorway',
    label: 'Doorway',
    category: 'wall',
    color: '#8a6e4b',
    geometry: { type: 'box', args: [UNIT_SIZE, WALL_HEIGHT, 0.2] },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },
  {
    id: 'curved_wall',
    label: 'Curved Wall',
    category: 'wall',
    color: '#8a6e4b',
    geometry: { type: 'curved', radius: CURVE_RADIUS, height: WALL_HEIGHT, thickness: 0.2 },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },
  {
    id: 'curved_half_wall',
    label: 'Curved Half Wall',
    category: 'wall',
    color: '#8a6e4b',
    geometry: { type: 'curved', radius: CURVE_RADIUS, height: HALF_WALL_HEIGHT, thickness: 0.2 },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },

  // ── Roofs ───────────────────────────────────────────────────
  {
    id: 'square_roof',
    label: 'Square Roof',
    category: 'roof',
    color: '#5D4037',
    geometry: { type: 'box', args: [UNIT_SIZE, FOUNDATION_HEIGHT, UNIT_SIZE] },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },
  {
    id: 'triangle_roof',
    label: 'Triangle Roof',
    category: 'roof',
    color: '#5D4037',
    geometry: { type: 'triangle', sideLength: UNIT_SIZE, height: FOUNDATION_HEIGHT },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 60,
  },

  // ── Inclines ────────────────────────────────────────────────
  {
    id: 'stairs',
    label: 'Stairs',
    category: 'incline',
    color: '#6d5e4d',
    geometry: { type: 'wedge', args: [UNIT_SIZE, WALL_HEIGHT, UNIT_SIZE] },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },
  {
    id: 'stairs_2',
    label: 'Stairs (Narrow)',
    category: 'incline',
    color: '#6d5e4d',
    geometry: { type: 'wedge', args: [UNIT_SIZE, WALL_HEIGHT, UNIT_SIZE] },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 30,
  },
  {
    id: 'ramp',
    label: 'Ramp',
    category: 'incline',
    color: '#6d5e4d',
    geometry: { type: 'wedge', args: [UNIT_SIZE, WALL_HEIGHT, UNIT_SIZE] },
    gridFootprint: [1, 1, 1],
    rotationIncrement: 90,
  },
];

export function getBlockDef(id: string): BlockDefinition {
  const def = blockDefinitions.find((b) => b.id === id);
  if (!def) throw new Error(`Unknown block type: ${id}`);
  return def;
}
