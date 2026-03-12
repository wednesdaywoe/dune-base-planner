import { useStore } from '../store/useStore';
import { blockDefinitions } from '../data/blockDefinitions';

export function BlockPalette() {
  const selectedBlockType = useStore((s) => s.selectedBlockType);
  const setSelectedBlockType = useStore((s) => s.setSelectedBlockType);

  return (
    <div style={styles.container}>
      <div style={styles.title}>Blocks</div>
      {blockDefinitions.map((def, i) => (
        <button
          key={def.id}
          onClick={() => setSelectedBlockType(def.id)}
          style={{
            ...styles.button,
            ...(selectedBlockType === def.id ? styles.selected : {}),
          }}
          title={`${def.label} (${i + 1})`}
        >
          <div
            style={{
              ...styles.swatch,
              backgroundColor: def.color,
            }}
          />
          <span style={styles.label}>{def.label}</span>
        </button>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'absolute',
    left: 12,
    top: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    background: 'rgba(20, 18, 15, 0.9)',
    borderRadius: 8,
    padding: 10,
    minWidth: 140,
  },
  title: {
    color: '#c2a366',
    fontSize: 13,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    marginBottom: 4,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(255,255,255,0.05)',
    border: '2px solid transparent',
    borderRadius: 6,
    padding: '6px 10px',
    cursor: 'pointer',
    color: '#ddd',
    fontSize: 13,
  },
  selected: {
    borderColor: '#c2a366',
    background: 'rgba(194, 163, 102, 0.15)',
  },
  swatch: {
    width: 18,
    height: 18,
    borderRadius: 3,
    flexShrink: 0,
  },
  label: {
    whiteSpace: 'nowrap' as const,
  },
};
