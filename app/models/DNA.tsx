import points from '@/public/dna.json';
import Model from "@/app/models/Model";
import { Vector3 } from "three";

export default function DNA() {
  return (
    <Model points={points as Vector3[]} />
  )

}