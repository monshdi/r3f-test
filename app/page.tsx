import MainCanvas from "@/app/models/MainCanvas/MainCanvas";
import Covid from "@/app/models/Covid";
import DNA from "@/app/models/DNA";

export default function Home() {
  return (
    <>
      <h1>next r3f test</h1>
      <MainCanvas>
        <DNA />
        <Covid />
      </MainCanvas>
    </>
  )
}
