import * as THREE from 'three';
import { useStore } from '../store/useStore';
import { getBlockDef } from '../data/blockDefinitions';
import { BlockMesh } from './BlockMesh';

export function GhostBlock() {
  const ghostPosition = useStore((s) => s.ghostPosition);
  const ghostRotation = useStore((s) => s.ghostRotation);
  const selectedBlockType = useStore((s) => s.selectedBlockType);
  const mode = useStore((s) => s.mode);

  if (mode !== 'place' || !ghostPosition) return null;

  const def = getBlockDef(selectedBlockType);
  const rotationRad = THREE.MathUtils.degToRad(ghostRotation);

  return (
    <group position={ghostPosition} rotation={[0, rotationRad, 0]}>
      <BlockMesh def={def} transparent opacity={0.5} depthWrite={false} />
    </group>
  );
}
