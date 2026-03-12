import type { ThreeEvent } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import { getBlockDef } from '../data/blockDefinitions';
import { computePlacementOnGround } from '../utils/snapping';

export function GroundPlane() {
  const placeBlock = useStore((s) => s.placeBlock);
  const selectedBlockType = useStore((s) => s.selectedBlockType);
  const ghostRotation = useStore((s) => s.ghostRotation);
  const setGhostPosition = useStore((s) => s.setGhostPosition);
  const mode = useStore((s) => s.mode);

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (mode !== 'place') return;
    e.stopPropagation();
    const def = getBlockDef(selectedBlockType);
    const pos = computePlacementOnGround(e.point, def, ghostRotation);
    setGhostPosition(pos);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (mode !== 'place') return;
    e.stopPropagation();
    const def = getBlockDef(selectedBlockType);
    const pos = computePlacementOnGround(e.point, def, ghostRotation);
    placeBlock(selectedBlockType, pos, ghostRotation);
  };

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.001, 0]}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
}
