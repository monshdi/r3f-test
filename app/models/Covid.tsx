import points from '@/public/covid2.json';
import Model from "@/app/models/Model";
import { Vector3 } from "three";
export default function Covid() {
  const flated = points.flat();

  const rotation = Math.PI / 2;

  return (
    <Model
      points={flated as Vector3[]}
      position-y={1}
      rotation-x={rotation}
    />
  )

}