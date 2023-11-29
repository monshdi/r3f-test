'use client';

import { useGLTF } from "@react-three/drei";

export default function BaseScene() {
  const { scene } = useGLTF('/Vector_Scene.gltf')

  return <primitive object={scene} />
}