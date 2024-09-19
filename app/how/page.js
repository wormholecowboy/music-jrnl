"use client"
import { useRouter } from "next/navigation"

export default function How(){
  const r = useRouter();

  return (
    <div className="mx-auto w-2/5 flex flex-col items-center">
    <p className="my-9 text-lg">
        Eventually I'll post a Youtube video here explaining how to use this. But the general flow is:
        <br/>
        <br/>
        1. Generate phrases until you hear one you like 
        <br/>
        2. Move it to the Pool
        <br/>
        3. Repeat until you have a pool of phrases you like
        <br/>
        4. Move 2-3 phrases up to the working area by clicking the hammer
        <br/>
        5. Play them in every combo, drag them around, add rests, etc.
        <br/>
        6. Save your favorites 
        </p>
      <button onClick={() => r.push("/play")} className="m-7 p-3 rounded-md border-white border-2">Start Creating!</button>
    </div>
  )
}
