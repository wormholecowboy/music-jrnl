"use client";
import { useGlobalContext } from "../../play/useGlobalContext";
import { Scale } from "@tonaljs/tonal";
import { v4 as uuidv4 } from "uuid";
import playPhrase from "../../../utils/playPhrase";
import phraseAlreadyInList from "../../../utils/phraseAlreadyInList";

import {
  randomColor,
  randomIndex,
  randomIndexNoRepeat,
} from "../../../utils/random";

import {
  tasteAdjectives,
  soundAdjectives,
  sounds,
} from "../../../utils/lists-of-words";

export default function GenerateButton({
  generatorLowNote,
  generatorHighNote,
  numOfNotes,
  setCurrentPhrase,
  currentPhrase,
  scaleTonality,
}) {
  const { poolPhrases, setPoolPhrases, bpm, scaleLetter } = useGlobalContext();

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

  function createName() {
    const taste = tasteAdjectives[randomIndex(0, tasteAdjectives.length - 1)];
    const sound = sounds[randomIndex(0, sounds.length - 1)];
    const adjective =
      soundAdjectives[randomIndex(0, soundAdjectives.length - 1)];
    return `${taste} ${adjective} ${sound}`;
  };

  function createPhrase(generatedScale, rhythmArray) {
    let phrase = [];
    for (let i = 0; i < numOfNotes; i++) {
      let randomNote = generatedScale[randomIndexNoRepeat(generatorLowNote, generatorHighNote + 1)];
      let rhythm = rhythmArray[randomIndex(0, rhythmArray.length)];
      phrase.push({ note: randomNote, time: rhythm });
    }
    return phrase;
  };

  function createPhraseObject() {
    const id = uuidv4();
    const name = createName();
    const color = randomColor();
    const generatedScale = generateScale();
    const rhythmArray = ["8n"];
    const phrase = createPhrase(generatedScale, rhythmArray);

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

  function generateScale() {
    let lowerCaseTonality = scaleTonality.toLowerCase();
    let scaleRange = Scale.rangeOf(`C ${lowerCaseTonality}`);
    let generatedScale = scaleRange("C2", "C5"); // beyond this range sounds bad
    return generatedScale;
  }

  function handleGeneratePhrase() {
    const phraseObj = createPhraseObject();
    playPhrase(phraseObj, scaleLetter, bpm);
  }

  function handleRepeat() {
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
          onClick={handleGeneratePhrase}
          className="self-center px-4 py-2 text-color4 border-2 border-color4 shadow-lg rounded-lg bg-color5"
        >
          Generate
        </button>
        <button
          onClick={handleRepeat}
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
