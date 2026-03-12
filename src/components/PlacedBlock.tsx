import { useState, useCallback } from 'react';
import * as THREE from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import { getBlockDef } from '../data/blockDefinitions';
import { computePlacementOnFace } from '../utils/snapping';
import { BlockMesh } from './BlockMesh';
import type { PlacedBlock as PlacedBlockType } from '../types';

interface PlacedBlockProps {
  block: PlacedBlockType;
}

export function PlacedBlock({ block }: PlacedBlockProps) {
  const mode = useStore((s) => s.mode);
  const selectedBlockType = useStore((s) => s.selectedBlockType);
  const ghostRotation = useStore((s) => s.ghostRotation);
  const placeBlock = useStore((s) => s.placeBlock);
  const removeBlock = useStore((s) => s.removeBlock);
  const setGhostPosition = useStore((s) => s.setGhostPosition);
  const [hovered, setHovered] = useState(false);

  const def = getBlockDef(block.type);

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (mode !== 'place') return;
      e.stopPropagation();
      if (!e.face) return;

      const worldNormal = e.face.normal
        .clone()
        .transformDirection(e.object.matrixWorld);

      const newDef = getBlockDef(selectedBlockType);
      const pos = computePlacementOnFace(
        block.position,
        def,
        block.rotation,
        worldNormal,
        newDef,
        ghostRotation
      );
      setGhostPosition(pos);
    },
    [mode, selectedBlockType, ghostRotation, block, def, setGhostPosition]
  );

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();

      if (mode === 'delete') {
        removeBlock(block.id);
        return;
      }

      if (mode === 'place' && e.face) {
        const worldNormal = e.face.normal
          .clone()
          .transformDirection(e.object.matrixWorld);

        const newDef = getBlockDef(selectedBlockType);
        const pos = computePlacementOnFace(
          block.position,
          def,
          block.rotation,
          worldNormal,
          newDef,
          ghostRotation
        );
        placeBlock(selectedBlockType, pos, ghostRotation);
      }
    },
    [mode, selectedBlockType, ghostRotation, block, def, placeBlock, removeBlock]
  );

  const handlePointerOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (mode === 'delete') {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }
    },
    [mode]
  );

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  }, []);

  const rotationRad = THREE.MathUtils.degToRad(block.rotation);

  return (
    <group
      position={block.position}
      rotation={[0, rotationRad, 0]}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <BlockMesh
        def={def}
        emissive={hovered && mode === 'delete' ? '#ff4444' : undefined}
        emissiveIntensity={0.5}
      />
    </group>
  );
}
