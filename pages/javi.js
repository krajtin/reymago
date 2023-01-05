import dynamic from "next/dynamic";
const Game = dynamic(() => import('../components/Game'), { ssr: false });
export default function Javi() {
  return (
    <>
    <Game image={"magic.jpeg"} textEnd={"Regalo de Baltazar mediante transferencia !!!"}/>
    </>
  )
}
