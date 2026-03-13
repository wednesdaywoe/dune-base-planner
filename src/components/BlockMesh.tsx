import { useMemo } from 'react';
import * as THREE from 'three';
import type { BlockDefinition } from '../types';

function createWedgeGeometry(w: number, h: number, d: number): THREE.BufferGeometry {
  const hw = w / 2;
  const hd = d / 2;

  const vertices = new Float32Array([
    -hw, 0, hd,    hw, 0, hd,
    -hw, 0, -hd,   hw, 0, -hd,
    -hw, h, -hd,   hw, h, -hd,
  ]);

  const indices = [
    0, 2, 1,  1, 2, 3,
    2, 4, 3,  3, 4, 5,
    0, 1, 4,  1, 5, 4,
    0, 4, 2,
    1, 3, 5,
  ];

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/** Equilateral triangle prism, centered at centroid, extruded along Y */
function createTriangleGeometry(sideLength: number, height: number): THREE.BufferGeometry {
  const apothem = sideLength / (2 * Math.sqrt(3));
  const radius = sideLength / Math.sqrt(3);
  const hh = height / 2;

  // Vertices of equilateral triangle centered at origin (XZ plane)
  // v0 = front vertex, v1 = back-right, v2 = back-left
  const v0: [number, number] = [0, radius];
  const v1: [number, number] = [sideLength / 2, -apothem];
  const v2: [number, number] = [-sideLength / 2, -apothem];

  const vertices = new Float32Array([
    // Bottom face (y = -hh)
    v0[0], -hh, v0[1],  // 0
    v1[0], -hh, v1[1],  // 1
    v2[0], -hh, v2[1],  // 2
    // Top face (y = +hh)
    v0[0], hh, v0[1],   // 3
    v1[0], hh, v1[1],   // 4
    v2[0], hh, v2[1],   // 5
  ]);

  const indices = [
    // Bottom
    0, 2, 1,
    // Top
    3, 4, 5,
    // Side 0-1 (front-right)
    0, 1, 4,  0, 4, 3,
    // Side 1-2 (back)
    1, 2, 5,  1, 5, 4,
    // Side 2-0 (front-left)
    2, 0, 3,  2, 3, 5,
  ];

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/** Quarter-circle curved piece (foundation or wall), centered at the inner corner */
function createCurvedGeometry(radius: number, height: number, thickness: number): THREE.BufferGeometry {
  const segments = 16;
  const hh = height / 2;
  const innerR = radius - thickness;
  const vertices: number[] = [];
  const indices: number[] = [];

  // Generate vertices for inner and outer arcs, top and bottom
  for (let i = 0; i <= segments; i++) {
    const angle = (Math.PI / 2) * (i / segments);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Bottom outer, bottom inner, top outer, top inner
    vertices.push(cos * radius, -hh, sin * radius);       // 4i
    vertices.push(cos * innerR, -hh, sin * innerR);       // 4i+1
    vertices.push(cos * radius, hh, sin * radius);        // 4i+2
    vertices.push(cos * innerR, hh, sin * innerR);        // 4i+3
  }

  for (let i = 0; i < segments; i++) {
    const a = i * 4;
    const b = (i + 1) * 4;

    // Outer face
    indices.push(a, b, a + 2, b, b + 2, a + 2);
    // Inner face
    indices.push(a + 1, a + 3, b + 1, b + 1, a + 3, b + 3);
    // Top face
    indices.push(a + 2, b + 2, a + 3, b + 2, b + 3, a + 3);
    // Bottom face
    indices.push(a, a + 1, b, b, a + 1, b + 1);
  }

  // End caps
  const first = 0;
  const last = segments * 4;
  // Start cap (angle=0)
  indices.push(first, first + 2, first + 1, first + 1, first + 2, first + 3);
  // End cap (angle=PI/2)
  indices.push(last, last + 1, last + 2, last + 1, last + 3, last + 2);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
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
  const customGeo = useMemo(() => {
    if (def.geometry.type === 'wedge') {
      return createWedgeGeometry(...def.geometry.args);
    }
    if (def.geometry.type === 'triangle') {
      return createTriangleGeometry(def.geometry.sideLength, def.geometry.height);
    }
    if (def.geometry.type === 'curved') {
      return createCurvedGeometry(def.geometry.radius, def.geometry.height, def.geometry.thickness);
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

  if ((def.geometry.type === 'wedge' || def.geometry.type === 'triangle' || def.geometry.type === 'curved') && customGeo) {
    return (
      <mesh geometry={customGeo}>
        <meshStandardMaterial {...materialProps} />
      </mesh>
    );
  }

  return null;
}
