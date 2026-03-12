import type { BlockDefinition } from '../types';

export const blockDefinitions: BlockDefinition[] = [
  {
    id: 'cube',
    label: 'Foundation Block',
    color: '#c2a366',
    geometry: { type: 'box', args: [1, 1, 1] },
    gridFootprint: [1, 1, 1],
  },
  {
    id: 'wall',
    label: 'Wall Panel',
    color: '#a89070',
    geometry: { type: 'box', args: [1, 2, 0.2] },
    gridFootprint: [1, 2, 1],
  },
  {
    id: 'floor',
    label: 'Floor Slab',
    color: '#d4c4a0',
    geometry: { type: 'box', args: [2, 0.2, 2] },
    gridFootprint: [2, 1, 2],
  },
  {
    id: 'ramp',
    label: 'Ramp / Wedge',
    color: '#b8a070',
    geometry: { type: 'wedge', args: [1, 1, 2] },
    gridFootprint: [1, 1, 2],
  },
  {
    id: 'pillar',
    label: 'Column / Pillar',
    color: '#8a7a60',
    geometry: { type: 'cylinder', args: [0.2, 0.2, 2, 8] },
    gridFootprint: [1, 2, 1],
  },
];

export function getBlockDef(id: string): BlockDefinition {
  const def = blockDefinitions.find((b) => b.id === id);
  if (!def) throw new Error(`Unknown block type: ${id}`);
  return def;
}
