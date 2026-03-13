import { OrbitControls, Grid } from '@react-three/drei';
import { GroundPlane } from './GroundPlane';
import { PlacedBlocks } from './PlacedBlocks';
import { GhostBlock } from './GhostBlock';
import { UNIT_SIZE } from '../types';

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 10]} intensity={0.8} />
      <OrbitControls makeDefault mouseButtons={{ LEFT: -1, MIDDLE: 2, RIGHT: 0 }} />
      <Grid
        args={[200, 200]}
        cellSize={UNIT_SIZE}
        sectionSize={UNIT_SIZE * 5}
        fadeDistance={80}
        cellColor="#555555"
        sectionColor="#888888"
        position={[0, -0.001, 0]}
      />
      <GroundPlane />
      <PlacedBlocks />
      <GhostBlock />
    </>
  );
}
