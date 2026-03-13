import * as THREE from 'three';
import type { BlockDefinition } from '../types';
import { UNIT_SIZE } from '../types';

/** Snap to the center of a grid cell (half-unit offset) */
export function snapToGrid(value: number, gridSize = UNIT_SIZE): number {
  return Math.floor(value / gridSize) * gridSize + gridSize / 2;
}

export function getRotatedFootprint(
  def: BlockDefinition,
  rotation: number
): [number, number, number] {
  const [fx, fy, fz] = def.gridFootprint;
  if (rotation === 90 || rotation === 270) {
    return [fz, fy, fx];
  }
  return [fx, fy, fz];
}

export function getRotatedGeometrySize(
  def: BlockDefinition,
  rotation: number
): [number, number, number] {
  let w: number, h: number, d: number;
  if (def.geometry.type === 'cylinder') {
    const [r, , height] = def.geometry.args;
    w = r * 2;
    h = height;
    d = r * 2;
  } else {
    [w, h, d] = def.geometry.args;
  }
  if (rotation === 90 || rotation === 270) {
    return [d, h, w];
  }
  return [w, h, d];
}

export function computePlacementOnGround(
  point: THREE.Vector3,
  blockDef: BlockDefinition,
  rotation: number
): [number, number, number] {
  const [, h] = getRotatedGeometrySize(blockDef, rotation);
  return [snapToGrid(point.x), h / 2, snapToGrid(point.z)];
}

export function computePlacementOnFace(
  existingPos: [number, number, number],
  existingDef: BlockDefinition,
  existingRotation: number,
  faceNormal: THREE.Vector3,
  newDef: BlockDefinition,
  newRotation: number
): [number, number, number] {
  // Snap the face normal to the nearest axis
  const snappedNormal = new THREE.Vector3(
    Math.round(faceNormal.x),
    Math.round(faceNormal.y),
    Math.round(faceNormal.z)
  );

  const existingSize = getRotatedGeometrySize(existingDef, existingRotation);
  const newSize = getRotatedGeometrySize(newDef, newRotation);

  const offset: [number, number, number] = [
    existingPos[0] + snappedNormal.x * (existingSize[0] / 2 + newSize[0] / 2),
    existingPos[1] + snappedNormal.y * (existingSize[1] / 2 + newSize[1] / 2),
    existingPos[2] + snappedNormal.z * (existingSize[2] / 2 + newSize[2] / 2),
  ];

  // Snap non-normal axes to grid cell centers
  if (Math.abs(snappedNormal.x) < 0.5) offset[0] = snapToGrid(offset[0], UNIT_SIZE);
  if (Math.abs(snappedNormal.y) < 0.5) offset[1] = snapToGrid(offset[1], UNIT_SIZE);
  if (Math.abs(snappedNormal.z) < 0.5) offset[2] = snapToGrid(offset[2], UNIT_SIZE);

  // Don't go underground
  if (offset[1] < newSize[1] / 2) offset[1] = newSize[1] / 2;

  return offset;
}
