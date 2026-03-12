import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { BlockPalette } from './ui/BlockPalette';
import { Toolbar } from './ui/Toolbar';
import { useStore } from './store/useStore';
import { blockDefinitions } from './data/blockDefinitions';

function KeyboardHandler() {
  const rotateGhost = useStore((s) => s.rotateGhost);
  const setMode = useStore((s) => s.setMode);
  const mode = useStore((s) => s.mode);
  const setSelectedBlockType = useStore((s) => s.setSelectedBlockType);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        rotateGhost();
      }
      if (e.key === 'x' || e.key === 'X') {
        setMode(mode === 'delete' ? 'place' : 'delete');
      }
      if (e.key === 'Escape') {
        setMode('place');
      }
      const num = parseInt(e.key);
      if (num >= 1 && num <= blockDefinitions.length) {
        setSelectedBlockType(blockDefinitions[num - 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rotateGhost, setMode, mode, setSelectedBlockType]);

  return null;
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a2e' }}>
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <Scene />
      </Canvas>
      <BlockPalette />
      <Toolbar />
      <KeyboardHandler />
      <div style={helpStyle}>
        Left-click: place &middot; Right-drag: orbit &middot; Scroll: zoom &middot; R: rotate &middot; X: delete mode &middot; 1-5: select block
      </div>
    </div>
  );
}

const helpStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 12,
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#777',
  fontSize: 12,
  whiteSpace: 'nowrap',
  background: 'rgba(20, 18, 15, 0.8)',
  padding: '4px 12px',
  borderRadius: 6,
};

export default App;
