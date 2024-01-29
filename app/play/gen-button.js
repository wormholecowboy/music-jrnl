'use client';
import { usePoolPhrasesContext } from "./use-poolphrases-context";
import { Scale } from "@tonaljs/tonal";
import { v4 as uuidv4 } from "uuid";
import playPhrase from "../../utils/playPhrase";
import { randomColor, randomIndex, randomIndexNoRepeat } from "../../utils/random";

export default function GenerateButton({
  selectedRangeOfNotes,
  lowState,
  hiState,
  numOFNotes, // FIX: capitalization for this var
  setCurrentPhrase,
  currentPhrase,
  scaleTonality,
}) {
  //
  //
  const slicedScale = selectedRangeOfNotes.slice(
    lowState,
    parseInt(hiState) + 1,
  );
  const { setPoolPhrases, bpm, scaleLetter } = usePoolPhrasesContext();
  const rhythmArray = ["8n"];

  const createPhrase = () => {
    let phrase = [];
    const id = uuidv4();
    const name = "temp";
    const color = randomColor();
    const generatedScale = scaleGenerator();
    console.log("gen button")
    console.log('generatedScale:', generatedScale)
    const tempArray = [...Array(generatedScale.length).keys()];

    for (let i = 0; i < numOFNotes; i++) {
      let randomNote =
        generatedScale[randomIndexNoRepeat(lowState, hiState + 1)];
      let rhythm = rhythmArray[randomIndex(0, rhythmArray.length)];
      phrase.push({ note: randomNote, time: rhythm });
    }
    console.log('phrase:', phrase)

    const phraseObj = {
      phrase: phrase,
      name: name,
      id: id,
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
    /* Tone.start();
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start(); */
    const phraseObj = createPhrase();
    playPhrase(phraseObj, scaleLetter, bpm);
  }

  function repeat() {
    // Tone.start();
    // Tone.Transport.bpm.value = bpm;
    // Tone.Transport.start();
    // const lastPhrase = phraseHistory.current[phraseHistory.current.length - 1]
    playPhrase(currentPhrase, scaleLetter, bpm);
  }

  // this is here to avoid instantiating in node, needs the browser
  /* useEffect(() => {
    let synth = new Tone.Synth().toDestination();
    setSynthA(synth);
  }, []); */

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
