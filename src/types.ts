export interface BlockDefinition {
  id: string;
  label: string;
  color: string;
  geometry:
    | { type: 'box'; args: [number, number, number] }
    | { type: 'wedge'; args: [number, number, number] }
    | { type: 'cylinder'; args: [number, number, number, number] };
  gridFootprint: [number, number, number]; // [x, y, z] in grid units
}

export interface PlacedBlock {
  id: string;
  type: string;
  position: [number, number, number];
  rotation: number; // 0, 90, 180, 270
}

export type InteractionMode = 'place' | 'delete';
