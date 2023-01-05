
import dynamic from "next/dynamic";
const Game = dynamic(() => import('../components/Game'), { ssr: false });
export default function David() {
  return (
    <Game image={"marvel.jpg"} textEnd={"Regalo de Balzatar mediante transferencia !!!"}/>
  )
}
