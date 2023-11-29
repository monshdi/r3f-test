import MainCanvas from "@/app/models/MainCanvas/MainCanvas";
import Covid from "@/app/models/Covid";
import DNA from "@/app/models/DNA";
import BaseScene from "@/app/models/BaseScene";
import MainScene from "@/app/models/MainScene";

export default function Home() {
  return (
    <MainCanvas>
      <MainScene>
        {/*<BaseScene />*/}
        <DNA />
        <Covid />
      </MainScene>
    </MainCanvas>
  )
}
