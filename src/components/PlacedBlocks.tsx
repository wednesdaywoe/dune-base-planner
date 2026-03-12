import { useStore } from '../store/useStore';
import { PlacedBlock } from './PlacedBlock';

export function PlacedBlocks() {
  const blocks = useStore((s) => s.blocks);

  return (
    <>
      {blocks.map((block) => (
        <PlacedBlock key={block.id} block={block} />
      ))}
    </>
  );
}
