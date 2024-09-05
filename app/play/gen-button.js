"use client";
import { useGlobalContext } from "./use-global-context";
import { Scale } from "@tonaljs/tonal";
import { v4 as uuidv4 } from "uuid";
import playPhrase from "../../utils/playPhrase";
import phraseAlreadyInList from "../../utils/phraseAlreadyInList";

import {
  randomColor,
  randomIndex,
  randomIndexNoRepeat,
} from "../../utils/random";

import {
  tasteAdjectives,
  soundAdjectives,
  sounds,
} from "../../utils/lists-of-words";

export default function GenerateButton({
  selectedRangeOfNotes,
  lowState,
  hiState,
  numOfNotes,
  setCurrentPhrase,
  currentPhrase,
  scaleTonality,
}) {

  const slicedScale = selectedRangeOfNotes.slice(
    lowState,
    parseInt(hiState) + 1,
  );
  const { poolPhrases, setPoolPhrases, bpm, scaleLetter } = useGlobalContext();
  const rhythmArray = ["8n"];

  function handleSendToPool() {
    if (!currentPhrase) {
      window.alert("Try generating a phrase first");
      return;
    }

    if (phraseAlreadyInList(currentPhrase, poolPhrases)) {
      window.alert("Phrase is already in your list.");
      return;
    }

    setPoolPhrases((prev) => [...prev, currentPhrase]);
  }

  const createName = () => {
    const taste = tasteAdjectives[randomIndex(0, tasteAdjectives.length - 1)];
    const sound = sounds[randomIndex(0, sounds.length - 1)];
    const adjective =
      soundAdjectives[randomIndex(0, soundAdjectives.length - 1)];
    return `${taste} ${adjective} ${sound}`;
  };

  const createPhrase = () => {
    let phrase = [];
    const id = uuidv4();
    const name = createName();
    const color = randomColor();
    const generatedScale = scaleGenerator();

    for (let i = 0; i < numOfNotes; i++) {
      let randomNote =
        generatedScale[randomIndexNoRepeat(lowState, hiState + 1)];
      let rhythm = rhythmArray[randomIndex(0, rhythmArray.length)];
      phrase.push({ note: randomNote, time: rhythm });
    }

    const phraseObj = {
      phrase: phrase,
      name: name,
      phrase_id: id,
      color: color,
      tonality: scaleTonality,
    };

    setCurrentPhrase(phraseObj);
    return phraseObj;
  };

  function scaleGenerator() {
    let lowerCaseTonality = scaleTonality.toLowerCase();
    let scaleGenerator = Scale.rangeOf(`C ${lowerCaseTonality}`);
    let generatedScale = scaleGenerator("C2", "C5"); // beyond this range sounds bad
    return generatedScale;
  }

  function run() {
    const phraseObj = createPhrase();
    playPhrase(phraseObj, scaleLetter, bpm);
  }

  function repeat() {
    if (!currentPhrase) {
      window.alert("Try generating a phrase first");
      return;
    }
    playPhrase(currentPhrase, scaleLetter, bpm);
  }

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
          onClick={handleSendToPool}
          className="self-center px-4 py-2 text-color4 shadow-lg rounded-lg bg-color5 border-2 border-color4"
        >
          Send to Pool
        </button>
      </div>
    </>
  );
}
