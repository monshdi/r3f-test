import MainCanvas from "@/app/models/MainCanvas/MainCanvas";
import Covid from "@/app/models/Covid";
import DNA from "@/app/models/DNA";
import BaseScene from "@/app/models/BaseScene";
import MainScene from "@/app/models/MainScene";
import MainScene2 from "@/app/models/MainScene2";

export default function Home() {
  return (
    <MainCanvas>
      {/*<MainScene>*/}
        {/*<BaseScene />*/}
      {/*  <DNA />*/}
      {/*  <Covid />*/}
      {/*</MainScene>*/}
      <MainScene2 />
    </MainCanvas>
  )
}
