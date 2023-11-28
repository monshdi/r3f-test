'use client';

import React from "react";
import { Canvas } from "@react-three/fiber";
import s from './MainCanvas.module.scss';

export default function MainCanvas({ children }: {children: React.ReactNode}) {
  return (
    <div className={s.wrapper}>
      <Canvas>
        {children}
      </Canvas>
    </div>
  )
}