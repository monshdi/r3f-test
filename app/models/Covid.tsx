import points from '@/public/covid.json';
import Model from "@/app/models/Model";
import { Vector3 } from "three";
export default function Covid() {
  const flated = points.flat();

  return (
    <Model
      points={flated as Vector3[]}
    />
  )

}