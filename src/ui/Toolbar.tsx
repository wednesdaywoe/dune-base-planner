import { useStore } from '../store/useStore';
import { saveLayout, loadLayout } from '../utils/serialization';

export function Toolbar() {
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);
  const ghostRotation = useStore((s) => s.ghostRotation);
  const rotateGhost = useStore((s) => s.rotateGhost);
  const blocks = useStore((s) => s.blocks);
  const clearAll = useStore((s) => s.clearAll);
  const loadBlocks = useStore((s) => s.loadBlocks);

  const handleDelete = () => {
    setMode(mode === 'delete' ? 'place' : 'delete');
  };

  const handleClear = () => {
    if (blocks.length === 0) return;
    if (window.confirm(`Clear all ${blocks.length} blocks?`)) {
      clearAll();
    }
  };

  const handleSave = () => {
    saveLayout(blocks);
  };

  const handleLoad = () => {
    const loaded = loadLayout();
    if (loaded) {
      loadBlocks(loaded);
    }
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handleDelete}
        style={{
          ...styles.button,
          ...(mode === 'delete' ? styles.active : {}),
        }}
        title="Delete mode (X)"
      >
        Delete
      </button>
      <button onClick={rotateGhost} style={styles.button} title="Rotate (R)">
        Rotate {ghostRotation}°
      </button>
      <div style={styles.separator} />
      <button onClick={handleSave} style={styles.button} title="Save to browser">
        Save
      </button>
      <button onClick={handleLoad} style={styles.button} title="Load from browser">
        Load
      </button>
      <div style={styles.separator} />
      <button onClick={handleClear} style={styles.button}>
        Clear All
      </button>
      <div style={styles.count}>{blocks.length} blocks</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'absolute',
    top: 12,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(20, 18, 15, 0.9)',
    borderRadius: 8,
    padding: '6px 12px',
  },
  button: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 5,
    padding: '5px 12px',
    cursor: 'pointer',
    color: '#ddd',
    fontSize: 13,
  },
  active: {
    background: 'rgba(255, 68, 68, 0.3)',
    borderColor: '#ff4444',
    color: '#ff8888',
  },
  separator: {
    width: 1,
    height: 20,
    background: 'rgba(255,255,255,0.15)',
  },
  count: {
    color: '#999',
    fontSize: 12,
    marginLeft: 6,
    whiteSpace: 'nowrap' as const,
  },
};
