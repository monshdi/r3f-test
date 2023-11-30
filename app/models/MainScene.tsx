'use client';

import { ReactNode, useEffect, useRef } from "react";
import { AnimationClip, Group, PerspectiveCamera as CameraType } from "three";
import animation from '@/public/animation.json';
import { PerspectiveCamera, useAnimations, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function MainScene({ children }: { children: ReactNode }) {
  const groupRef = useRef<Group>(null!);
  const cameraRef = useRef<CameraType>(null!);
  const { clock } = useThree();
  // const { animations } = useGLTF('/Vector_Scene.gltf')

  // const { actions } = useAnimations(animations, groupRef);

  let raf: () => void | null = null;

  useEffect(() => {
    let startTime: number | null = null;
    const animation = (time: number) => {
      if(!startTime) startTime = time;
      const progress = Math.min((time - startTime) / 1000, 1);
      cameraRef.current.position.x = progress * (0.5 - 2) + 2

      if (progress >= 1) {
        window.cancelAnimationFrame(raf)
      } else {
        raf = window.requestAnimationFrame(animation);
      }
    }

    animation();
    // console.log(actions['animation_0']?.getClip());
    // actions['animation_0']?.play();
  }, []);

  return (
    <group ref={groupRef}>
      <PerspectiveCamera
        ref={cameraRef}
        fov={28}
        makeDefault={true}
        name="Main_CAMERA"
        far={100}
        near={0.01}
        position={[2, 0, 2.5]}
      />
      {children}
    </group>
  )
};