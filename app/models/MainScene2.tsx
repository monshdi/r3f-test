'use client';

import React, { useEffect, useRef } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import { AnimationUtils, Group, LoopOnce } from "three";

export default function MainScene2() {
  const group = useRef<Group>(null!);
  // @ts-ignore
  const { nodes, animations } = useGLTF('/Vector_Scene.glb');
  const { actions, names, mixer, clips } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions[names[0]];
    const subclip = AnimationUtils.subclip(clips[0], '1', 0, 25, 26);
    const newAction = mixer.clipAction(subclip);
    newAction.clampWhenFinished = true;
    newAction.setLoop(LoopOnce, 0);
    newAction?.play();
  }, []);

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="World" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="Main_CAMERA_NULL" position={[444.461, 775.561, -113.626]}>
            <mesh name="Main_CAMERA_NULL_2" geometry={nodes.Main_CAMERA_NULL_2.geometry} material={nodes.Main_CAMERA_NULL_2.material} />
          </group>
          <PerspectiveCamera name="Main_CAMERA" makeDefault={true} far={10000} near={0.01} fov={22.895} position={[444.461, 775.561, -113.626]} rotation={[-Math.PI / 2, 0, 0]} />
          <group name="Covid_point" position={[0, 0, -110]}>
            <points name="Covid_point_Nozhki_mesh" geometry={nodes.Covid_point_Nozhki_mesh.geometry} material={nodes.Covid_point_Nozhki_mesh.material} position={[0.335, 0.377, 1.371]} rotation={[0, 0, -1.579]} />
            <points name="Covid_point_Pyatki_mesh" geometry={nodes.Covid_point_Pyatki_mesh.geometry} material={nodes.Covid_point_Pyatki_mesh.material} />
            <points name="Covid_point_Sphere_mesh" geometry={nodes.Covid_point_Sphere_mesh.geometry} material={nodes.Covid_point_Sphere_mesh.material} />
            <points name="Covid_point_Tulo_mesh" geometry={nodes.Covid_point_Tulo_mesh.geometry} material={nodes.Covid_point_Tulo_mesh.material} />
          </group>
          <group name="DNA_point" position={[0, -300, 0]}>
            <points name="DNA_point_Spiral_mesh" geometry={nodes.DNA_point_Spiral_mesh.geometry} material={nodes.DNA_point_Spiral_mesh.material} position={[5.3, -108.2, -139.6]} rotation={[0.866, -0.033, -0.308]} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Vector_Scene.glb')
