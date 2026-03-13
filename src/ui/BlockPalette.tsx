import { useState } from 'react';
import { useStore } from '../store/useStore';
import { blockDefinitions } from '../data/blockDefinitions';
import type { BuildingCategory } from '../types';

const categoryLabels: Record<BuildingCategory, string> = {
  foundation: 'Foundations',
  structure: 'Structures',
  wall: 'Walls',
  roof: 'Roofs',
  incline: 'Inclines',
};

const categoryOrder: BuildingCategory[] = ['foundation', 'structure', 'wall', 'roof', 'incline'];

export function BlockPalette() {
  const selectedBlockType = useStore((s) => s.selectedBlockType);
  const setSelectedBlockType = useStore((s) => s.setSelectedBlockType);
  const [collapsed, setCollapsed] = useState(false);

  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat],
      blocks: blockDefinitions.filter((b) => b.category === cat),
    }))
    .filter((g) => g.blocks.length > 0);

  return (
    <div style={styles.container}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={styles.header}
      >
        <span style={styles.title}>Blocks</span>
        <span style={styles.chevron}>{collapsed ? '\u25B6' : '\u25BC'}</span>
      </button>
      {!collapsed && (
        <div style={styles.list}>
          {grouped.map((group) => (
            <div key={group.category}>
              <div style={styles.categoryLabel}>{group.label}</div>
              {group.blocks.map((def) => (
                <button
                  key={def.id}
                  onClick={() => setSelectedBlockType(def.id)}
                  style={{
                    ...styles.button,
                    ...(selectedBlockType === def.id ? styles.selected : {}),
                  }}
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
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'absolute',
    left: 8,
    top: 8,
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(20, 18, 15, 0.9)',
    borderRadius: 8,
    minWidth: 140,
    maxHeight: 'calc(100vh - 16px)',
    maxWidth: 'calc(100vw - 16px)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 12px',
    touchAction: 'manipulation',
  },
  title: {
    color: '#c2a366',
    fontSize: 13,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
  chevron: {
    color: '#c2a366',
    fontSize: 11,
  },
  list: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
    padding: '0 8px 8px',
    overflowY: 'auto' as const,
    WebkitOverflowScrolling: 'touch' as const,
  },
  categoryLabel: {
    color: '#888',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    padding: '8px 4px 4px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(255,255,255,0.05)',
    border: '2px solid transparent',
    borderRadius: 6,
    padding: '8px 10px',
    cursor: 'pointer',
    color: '#ddd',
    fontSize: 13,
    minHeight: 36,
    touchAction: 'manipulation',
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
