import points from '@/public/covid.json';
import Model from "@/app/models/Model";

export default function Covid() {
  const flated = points.flat();

  return (
    <Model points={flated} />
  )

}