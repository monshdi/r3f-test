import points from '@/public/dna.json';
import Model from "@/app/models/Model";

export default function DNA() {
  return (
    <Model points={points} />
  )

}