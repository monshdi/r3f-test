'use client';

import React from "react";
import { Canvas } from "@react-three/fiber";
import s from './MainCanvas.module.scss';
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";

export default function MainCanvas({ children }: {children: React.ReactNode}) {
  return (
    <div className={s.wrapper}>
      <Canvas>
        <ScrollControls pages={1}>
          <Scroll html>
            <h1 className={s.h1}>1</h1>
            <h1 className={s.h1}>2</h1>
          </Scroll>
          <Scroll>
            {children}
          </Scroll>
        </ScrollControls>
        <OrbitControls />
      </Canvas>
    </div>
  )
}