import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone'; //this can be reduced to 'scale'
import { usePoolPhrasesContext } from './use-poolphrases-context';

export default function GenerateButton({
  selectedRangeOfNotes,
  lowState,
  hiState,
  bpm,
  numOFNotes,
  setCurrentPhrase,
  currentPhrase,
}) {
  //
  const slicedScale = selectedRangeOfNotes.slice(
    lowState,
    parseInt(hiState) + 1
  );
  console.log('sliced scale', slicedScale);
  const [synthA, setSynthA] = useState({});
  let currentNote = 0;
  let previousNote = 0;
  const rhythmArray = ['4n'];
  // Object, ({"4n" : 3, "8t" : -1}). The resulting time is equal to the sum of all of the keys multiplied by the values in the object.
  const phraseHistory = useRef([]);

  // const oneShot = () => {
  //   for (let i = 0; i < numOFNotes; i++) {
  //     let arrayLength = slicedScale.length;
  //     let randomNote = slicedScale[randomIndex(0, arrayLength)];
  //     let incr = Tone.Time({ '8n': i });
  //     let rhythm = rhythmArray[randomIndex(0, 10)];
  //     synthA.triggerAttackRelease(randomNote, rhythm, Tone.now() + incr);
  //   }
  // };

  function updateHistory(phrase) {
    phraseHistory.current.push(phrase);
    console.log('history', phraseHistory.current);
  }

  function playPhrase(arrayToPlay) {
    let delay = Tone.now();
    for (let i = 0; i < arrayToPlay.length; i++) {
      let time = arrayToPlay[i].time;
      delay += Tone.Time(time).toSeconds();
      synthA.triggerAttackRelease(
        arrayToPlay[i].note,
        arrayToPlay[i].time,
        delay
      );
    }
  }

  const createPhrase = () => {
    let phrase = [];
    for (let i = 0; i < numOFNotes; i++) {
      let randomNote = slicedScale[randomIndexNoRepeat(0, slicedScale.length)];
      let rhythm = rhythmArray[randomIndex(0, rhythmArray.length)];
      phrase = [...phrase, { note: randomNote, time: rhythm }];
    }
    updateHistory(phrase);
    // return phrase;
    setCurrentPhrase(phrase);
  };

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
    console.log('Start');
    Tone.start();
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
    // startTransport();
    // oneShot();
    createPhrase();
  }

  function repeat() {
    Tone.start();
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
    playPhrase(phraseHistory.current[phraseHistory.current.length - 1]);
  }

  const [poolPhrases, setPoolPhrases] = usePoolPhrasesContext();

  // this is here to avoid instantiating in node, needs the browser
  useEffect(() => {
    let synth = new Tone.Synth().toDestination();
    setSynthA(synth);
  }, []);

  useEffect(() => {
    playPhrase(currentPhrase);
    console.log(currentPhrase);
  }, [currentPhrase]);

  return (
    <>
      <div className="self-center flex flex-row gap-2">
        <button
          onClick={run}
          className="self-center px-4 py-2 text-green-500 shadow-md rounded-md bg-slate-700"
        >
          Generate
        </button>
        <button
          onClick={repeat}
          className="self-center px-4 py-2 text-green-500 shadow-md rounded-md bg-slate-700"
        >
          Repeat
        </button>
        <button
          onClick={() => {
            setPoolPhrases((prev) => [...prev, currentPhrase]);
            console.log('currentPhrase', currentPhrase);
            console.log('poolphrases', poolPhrases);
          }}
          className="self-center px-4 py-2 text-green-500 shadow-md rounded-md bg-slate-700"
        >
          Send to Pool
        </button>
      </div>
    </>
  );
}
