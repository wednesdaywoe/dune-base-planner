import { useMemo } from 'react';
import * as THREE from 'three';
import type { BlockDefinition } from '../types';

function createWedgeGeometry(w: number, h: number, d: number): THREE.BufferGeometry {
  const hw = w / 2;
  const hd = d / 2;

  // Right-angle triangle cross section extruded along X
  // Bottom-front, bottom-back, top-back (the ramp slopes from front-bottom to top-back)
  const vertices = new Float32Array([
    // Front-bottom-left, front-bottom-right
    -hw, 0, hd,    hw, 0, hd,
    // Back-bottom-left, back-bottom-right
    -hw, 0, -hd,   hw, 0, -hd,
    // Back-top-left, back-top-right
    -hw, h, -hd,   hw, h, -hd,
  ]);

  const indices = [
    // Bottom face
    0, 2, 1,  1, 2, 3,
    // Back face (vertical)
    2, 4, 3,  3, 4, 5,
    // Ramp face (slope)
    0, 1, 4,  1, 5, 4,
    // Left triangle
    0, 4, 2,
    // Right triangle
    1, 3, 5,
  ];

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

interface BlockMeshProps {
  def: BlockDefinition;
  color?: string;
  transparent?: boolean;
  opacity?: number;
  emissive?: string;
  emissiveIntensity?: number;
  depthWrite?: boolean;
}

export function BlockMesh({
  def,
  color,
  transparent = false,
  opacity = 1,
  emissive,
  emissiveIntensity,
  depthWrite,
}: BlockMeshProps) {
  const wedgeGeo = useMemo(() => {
    if (def.geometry.type === 'wedge') {
      return createWedgeGeometry(...def.geometry.args);
    }
    return null;
  }, [def]);

  const materialProps = {
    color: color ?? def.color,
    transparent,
    opacity,
    ...(depthWrite !== undefined ? { depthWrite } : {}),
    ...(transparent ? { side: THREE.DoubleSide as THREE.Side } : {}),
    ...(emissive ? { emissive, emissiveIntensity: emissiveIntensity ?? 0.3 } : {}),
  };

  if (def.geometry.type === 'box') {
    return (
      <mesh>
        <boxGeometry args={def.geometry.args} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    );
  }

  if (def.geometry.type === 'cylinder') {
    return (
      <mesh>
        <cylinderGeometry args={def.geometry.args} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    );
  }

  if (def.geometry.type === 'wedge' && wedgeGeo) {
    return (
      <mesh geometry={wedgeGeo}>
        <meshStandardMaterial {...materialProps} />
      </mesh>
    );
  }

  return null;
}
