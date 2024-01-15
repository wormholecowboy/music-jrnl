import { useEffect, useRef, useState } from "react";
import { Interval, Scale } from "@tonaljs/tonal";
import * as Tone from "tone"; //this can be reduced to 'scale'
import { usePoolPhrasesContext } from "./use-poolphrases-context";
import { v4 as uuidv4 } from "uuid";
import { colors } from "../styles/colors.js";
import ScaleLetter from "./gen-scale-letter";

export default function GenerateButton({
  selectedRangeOfNotes,
  lowState,
  hiState,
  numOFNotes,
  setCurrentPhrase,
  currentPhrase,
  scaleTonality,
  ScaleLetter,
}) {
  const slicedScale = selectedRangeOfNotes.slice(
    lowState,
    parseInt(hiState) + 1,
  );
  const [synthA, setSynthA] = useState({});
  let currentNote = 0;
  let previousNote = 0;
  const rhythmArray = ["8n"];
  // Object, ({"4n" : 3, "8t" : -1}). The resulting time is equal to the sum of all of the keys multiplied by the values in the object.
  const phraseHistory = useRef([]);

  function updateHistory(phrase) {
    phraseHistory.current.push(phrase);
  }

  function playPhrase(phraseObj) {
    const phrase = phraseObj.phrase;
    const dist = Interval.distance("C", `${ScaleLetter}`)
    console.log("dist", dist, ScaleLetter)
    let delay = Tone.now();
    for (let i = 0; i < phrase.length; i++) {
      let time = phrase[i].time;
      delay += Tone.Time(time).toSeconds();
      synthA.triggerAttackRelease(phrase[i].note, phrase[i].time, delay);
    }
  }

  const createPhrase = () => {
    let phrase = [];
    const id = uuidv4();
    const color = randomColor();

    let lowerCaseTonality = scaleTonality.toLowerCase();
    let scaleGenerator = Scale.rangeOf(`C ${lowerCaseTonality}`);
    let generatedScale = scaleGenerator("A2", "G5"); // beyond this range sounds bad
    const tempArray = [...Array(generatedScale.length).keys()];

    for (let i = 0; i < numOFNotes; i++) {
      let randomNote =
        generatedScale[randomIndexNoRepeat(0, generatedScale.length)];
      let rhythm = rhythmArray[randomIndex(0, rhythmArray.length)];
      phrase = [...phrase, { note: randomNote, time: rhythm }];
    }
    const phraseObj = {
      phrase: phrase,
      id: id,
      color: color,
      tonality: lowerCaseTonality,
    };
    updateHistory(phraseObj);
    setCurrentPhrase(phraseObj);

    console.log("color: ", phraseObj.color);

    return phraseObj;
  };

  function randomColor() {
    const idx = randomIndex(0, colors.length - 1);
    return colors[idx];
  }

  function randomIndex(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let index = Math.floor(Math.random() * (max - min) + min);
    return index;
  }
  // TODO: refactor these into one function
  function randomIndexNoRepeat(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    previousNote = currentNote;
    while (currentNote == previousNote) {
      currentNote = Math.floor(Math.random() * (max - min) + min);
    }
    return currentNote;
  }

  function run() {
    Tone.start();
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
    const phraseObj = createPhrase();
    playPhrase(phraseObj);
  }

  function repeat() {
    Tone.start();
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
    playPhrase(phraseHistory.current[phraseHistory.current.length - 1]);
  }

  const { setPoolPhrases, bpm } = usePoolPhrasesContext();

  // this is here to avoid instantiating in node, needs the browser
  useEffect(() => {
    let synth = new Tone.Synth().toDestination();
    setSynthA(synth);
  }, []);

  return (
    <>
      <div className="self-center flex flex-row gap-2">
        <button
          onClick={run}
          className="self-center px-4 py-2 text-color4 border-2 border-color4 shadow-lg rounded-lg bg-color5"
        >
          Generate
        </button>
        <button
          onClick={repeat}
          className="self-center px-4 py-2 text-color4 border-2 border-color4 shadow-lg rounded-lg bg-color5"
        >
          Repeat
        </button>
        <button
          onClick={() => {
            setPoolPhrases((prev) => [...prev, currentPhrase]);
          }}
          className="self-center px-4 py-2 text-color4 shadow-lg rounded-lg bg-color5 border-2 border-color4"
        >
          Send to Pool
        </button>
      </div>
    </>
  );
}
