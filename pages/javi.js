import dynamic from "next/dynamic";
const Game = dynamic(() => import('../components/Game'), { ssr: false });
export default function Javi() {
  return (
    <>
    <div>AAA</div>
    </>
  )
}
