import MainCanvas from "@/app/models/MainCanvas/MainCanvas";
import Covid from "@/app/models/Covid";
import DNA from "@/app/models/DNA";

export default function Home() {
  return (
    <MainCanvas>
      <DNA />
      <Covid />
    </MainCanvas>
  )
}
