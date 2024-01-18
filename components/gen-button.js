import { usePoolPhrasesContext } from "./use-poolphrases-context";
import { Scale } from "@tonaljs/tonal";
import { v4 as uuidv4 } from "uuid";
import playPhrase from "../utils/playPhrase";
import { randomColor, randomIndex, randomIndexNoRepeat } from "../utils/random";

export default function GenerateButton({
  selectedRangeOfNotes,
  lowState,
  hiState,
  numOFNotes,
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

  // Object, ({"4n" : 3, "8t" : -1}). The resulting time is equal to the sum of all of the keys multiplied by the values in the object.

  // prob can del this
  /* const phraseHistory = useRef([]);
  function updateHistory(phrase) {
    phraseHistory.current.push(phrase);
  } */

  /* function playPhrase(phraseObj) {
    const phrase = phraseObj.phrase;
    const dist = Interval.distance("C", `${scaleLetter}`);
    console.log("dist", dist, scaleLetter);
    const trans = phrase.map((noteandtime) => {
      const newNote = transpose(noteandtime.note, dist);
      const time = noteandtime.time;
      return { note: newNote, time: time };
    });

    let delay = Tone.now();
    for (let i = 0; i < trans.length; i++) {
      let time = trans[i].time;
      delay += Tone.Time(time).toSeconds();
      synthA.triggerAttackRelease(trans[i].note, trans[i].time, delay);
    }
  } */

  const createPhrase = () => {
    let phrase = [];
    const id = uuidv4();
    const color = randomColor();
    const generatedScale = scaleGenerator();
    const tempArray = [...Array(generatedScale.length).keys()];

    for (let i = 0; i < numOFNotes; i++) {
      let randomNote =
        generatedScale[randomIndexNoRepeat(0, generatedScale.length)];
      let rhythm = rhythmArray[randomIndex(0, rhythmArray.length)];
      phrase = [...phrase, { note: randomNote, time: rhythm }];
      // WARN: get rid of spread operator here
    }
    const phraseObj = {
      phrase: phrase,
      id: id,
      color: color,
      tonality: scaleTonality,
    };
    // updateHistory(phraseObj);
    setCurrentPhrase(phraseObj);

    return phraseObj;
  };

  function scaleGenerator() {
    let lowerCaseTonality = scaleTonality.toLowerCase();
    let scaleGenerator = Scale.rangeOf(`C ${lowerCaseTonality}`);
    let generatedScale = scaleGenerator("A2", "G5"); // beyond this range sounds bad
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
