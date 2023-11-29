import points from '@/public/dna.json';
import Model from "@/app/models/Model";
import { Vector3 } from "three";

export default function DNA({...rest}) {
  return (
      <Model
        points={points as Vector3[]}
        position-z={-20}
        opacity={0}
        {...rest}
      />
  )
}