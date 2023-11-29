import MainCanvas from "@/app/models/MainCanvas/MainCanvas";
import Covid from "@/app/models/Covid";
import DNA from "@/app/models/DNA";
import BaseScene from "@/app/models/BaseScene";

export default function Home() {
  return (
    <MainCanvas>
      {/*<BaseScene />*/}
      <DNA />
      <Covid />
    </MainCanvas>
  )
}
