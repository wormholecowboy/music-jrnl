"use client";
import { usePoolPhrasesContext } from "./use-poolphrases-context";
import Image from "next/image";
import playPhrase from "../../utils/playPhrase";
import { phraseToString } from "../../utils/random";

export default function Pool() {
  const { poolPhrases, setPoolPhrases, setWorkingPhrases, bpm, scaleLetter } =
    usePoolPhrasesContext();

  function addToWorkingPhrases(phraseObj) {
    const deepCopy = JSON.parse(JSON.stringify(phraseObj));
    setWorkingPhrases((prev) => [...prev, deepCopy]);
  }

  function handlePlayClick(phraseObj) {
    console.log("pool obj:", phraseObj);
    playPhrase(phraseObj, scaleLetter, bpm);
  }

  // function playPhrase(poolPhrase) {
  //     const phrase = poolPhrase.phrase
  //     /* poolPhrase.phrase.map(
  //         noteandtime => phrase.push(noteandtime)
  //     ) */
  //     Tone.Transport.bpm.value = bpm;
  //     let delay = Tone.now();
  //     for (let i = 0; i < phrase.length; i++) {
  //         let time = phrase[i].time;
  //         delay += Tone.Time(time).toSeconds();
  //         synthA.triggerAttackRelease(
  //             phrase[i].note,
  //             phrase[i].time,
  //             delay
  //         );
  //     }
  // }

  function deletePhrase(id) {
    setPoolPhrases((prev) => {
      const updatedPhrases = prev.filter((phraseObj) => phraseObj.id !== id);
      return updatedPhrases;
    });
  }

  // useEffect(() => {
  //   let synth = new Tone.Synth().toDestination();
  //   setSynthA(synth);
  // }, []);

  return (
    <>
      <div>
        {poolPhrases.map((phraseObj) => (
          <div
          title={phraseToString(phraseObj.phrase)}
            key={phraseObj.id}
            className={`flex items-center rounded-full m-2 px-4 py-1 w-10px h-10px ${phraseObj.color}`}
          >
            {phraseObj.name}
            <div className={"flex items-center justify-around"}>
              <span
                className="ml-4 cursor-pointer"
                onClick={() => handlePlayClick(phraseObj)}
              >
                <Image
                  alt="play"
                  src="/play.png"
                  width={20}
                  height={20}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </span>
              <span
                className="m-1 cursor-pointer"
                onClick={() => addToWorkingPhrases(phraseObj)}
              >
                <Image
                  alt="work"
                  src="/hammer.png"
                  width={20}
                  height={20}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </span>
              <span
                className="m-1 cursor-pointer"
                onClick={() => deletePhrase(phraseObj.id)}
              >
                <Image
                  alt="delete"
                  src="/trash.png"
                  className="rounded-full m-2"
                  width={20}
                  height={20}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </span>
              <Image
                alt="save"
                src="/save.png"
                className="rounded-full m-2"
                width={20}
                height={20}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
