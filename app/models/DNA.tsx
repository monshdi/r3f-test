import points from '@/public/dna2.json';
import Model from "@/app/models/Model";
import { Vector3 } from "three";

export default function DNA({...rest}) {
  const rotationX = (Math.PI + 0.4 ) / 4;
  const rotationY = (Math.PI - 1.5) / 6;

  return (
      <Model
        points={points as Vector3[]}
        position-z={-4}
        position-y={1.5}
        opacity={0}
        rotation-x={rotationX}
        rotation-y={rotationY}
        {...rest}
      />
  )
}