import { OrbitControls, Grid } from '@react-three/drei';
import { GroundPlane } from './GroundPlane';
import { PlacedBlocks } from './PlacedBlocks';
import { GhostBlock } from './GhostBlock';

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 10]} intensity={0.8} />
      <OrbitControls makeDefault mouseButtons={{ LEFT: -1, MIDDLE: 2, RIGHT: 0 }} />
      <Grid
        args={[50, 50]}
        cellSize={1}
        sectionSize={5}
        fadeDistance={60}
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
