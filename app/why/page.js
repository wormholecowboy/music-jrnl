"use client"
import { useRouter } from "next/navigation"

export default function Why() {
  const r = useRouter();

  return (
    <div className="mx-auto w-2/5 flex flex-col items-center">
    <p className="my-9 text-lg">
        Playing licks is easy. Improvisng fluidly with a large vocabulary is not. 
        <br/>
        <br/>
        I've found that one of the best practices to getting more comfortable with jumping from phrase to phrase
        is practicing getting in and out of phrases. 
        <br/>
        <br/>
        Being able to string them together in any combination, at any moment.
        <br/>
        <br/>
        This app helps you get there. 
        </p>
      <button onClick={() => r.push("/play")} className="m-7 p-3 rounded-md border-white border-2">Start Creating!</button>
    </div>
  )
}
