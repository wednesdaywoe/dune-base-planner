import type { PlacedBlock } from '../types';

const STORAGE_KEY = 'dune-base-planner-layout';

export function saveLayout(blocks: PlacedBlock[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
}

export function loadLayout(): PlacedBlock[] | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PlacedBlock[];
  } catch {
    return null;
  }
}
