"use client"
import { useRouter } from "next/navigation"

export default function Home(){
  const r = useRouter();

  return (
    <div className="mx-auto w-2/5 flex flex-col items-center">
    <p className="my-9 text-lg">
        This app will help you become a better improviser by helping you develop your own unique vocabulary.
        <br/>
        <br/>
        It will help you get inspired by generating random phrases and then let you save your favorites,
        slowly building a repository of phrases over time. </p>
      <button onClick={() => r.push("/play")} className="m-7 p-3 rounded-md border-white border-2">Start Creating!</button>
    </div>
  )
}
