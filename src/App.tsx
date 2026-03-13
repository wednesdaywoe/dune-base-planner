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
        Tap: place &middot; Right-drag: orbit &middot; Scroll: zoom
        <span className="desktop-only"> &middot; R: rotate &middot; X: delete mode</span>
      </div>
    </div>
  );
}

const helpStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 8,
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#777',
  fontSize: 12,
  textAlign: 'center',
  background: 'rgba(20, 18, 15, 0.8)',
  padding: '6px 12px',
  borderRadius: 6,
  maxWidth: 'calc(100vw - 16px)',
};

export default App;
