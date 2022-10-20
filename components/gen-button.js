import { useEffect, useState } from 'react';
import * as Tone from 'tone';
// this can be minimized to 'scale'

export default function GenerateButton({
  selectedRangeOfNotes,
  lowState,
  hiState,
  bpm,
  numOFNotes,
}) {
  const temp = parseInt(hiState) + 1;
  console.log('temp', temp);
  const slicedScale = selectedRangeOfNotes.slice(lowState, temp);
  console.log('sliced scale', slicedScale);
  const [synthA, setSynthA] = useState({});
  let currentNote = 0;
  let previousNote = 0;
  const rhythmArray = [
    '4n',
    '8n',
    '4t',
    '8t',
    '4n.',
    '8n.',
    // { '4n': 3, '8t': -1 },
  ];
  // Object, ({"4n" : 3, "8t" : -1}). The resulting time is equal to the sum of all of the keys multiplied by the values in the object.

  // const oneShot = () => {
  //   for (let i = 0; i < numOFNotes; i++) {
  //     let arrayLength = slicedScale.length;
  //     let randomNote = slicedScale[randomIndex(0, arrayLength)];
  //     let incr = Tone.Time({ '8n': i });
  //     let rhythm = rhythmArray[randomIndex(0, 10)];
  //     synthA.triggerAttackRelease(randomNote, rhythm, Tone.now() + incr);
  //   }
  // };

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
    return phrase;
  };

  function randomIndex(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let index = Math.floor(Math.random() * (max - min) + min);
    return index;
  }

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
    playPhrase(createPhrase());
  }

  // this is here to avoid instantiating in node, needs the browser
  useEffect(() => {
    let synth = new Tone.Synth().toDestination();
    setSynthA(synth);
  }, []);

  return (
    <>
      <button
        onClick={run}
        className="self-center px-4 py-2 text-green-500 shadow-md rounded-md bg-slate-700"
      >
        Generate
      </button>
      {/* <button */}
      {/*   onClick={repeat} */}
      {/*   className="self-center px-4 py-2 text-green-500 shadow-md rounded-md bg-slate-700" */}
      {/* > */}
      {/*   Repeat */}
      {/* </button> */}
    </>
  );
}
