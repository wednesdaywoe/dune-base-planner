import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { PlacedBlock, InteractionMode } from '../types';

interface StoreState {
  blocks: PlacedBlock[];
  selectedBlockType: string;
  mode: InteractionMode;
  ghostPosition: [number, number, number] | null;
  ghostRotation: number;

  placeBlock: (type: string, position: [number, number, number], rotation: number) => void;
  removeBlock: (id: string) => void;
  setSelectedBlockType: (type: string) => void;
  setMode: (mode: InteractionMode) => void;
  setGhostPosition: (pos: [number, number, number] | null) => void;
  rotateGhost: () => void;
  clearAll: () => void;
  loadBlocks: (blocks: PlacedBlock[]) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  blocks: [],
  selectedBlockType: 'cube',
  mode: 'place',
  ghostPosition: null,
  ghostRotation: 0,

  placeBlock: (type, position, rotation) => {
    const { blocks } = get();
    const occupied = blocks.some(
      (b) =>
        b.position[0] === position[0] &&
        b.position[1] === position[1] &&
        b.position[2] === position[2]
    );
    if (occupied) return;

    set({
      blocks: [
        ...blocks,
        { id: uuidv4(), type, position, rotation },
      ],
    });
  },

  removeBlock: (id) =>
    set((s) => ({ blocks: s.blocks.filter((b) => b.id !== id) })),

  setSelectedBlockType: (type) => set({ selectedBlockType: type, mode: 'place', ghostPosition: null }),

  setMode: (mode) => set({ mode }),

  setGhostPosition: (pos) => set({ ghostPosition: pos }),

  rotateGhost: () =>
    set((s) => ({ ghostRotation: (s.ghostRotation + 90) % 360 })),

  clearAll: () => set({ blocks: [] }),

  loadBlocks: (blocks) => set({ blocks }),
}));
