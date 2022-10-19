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
  const slicedScale = selectedRangeOfNotes.slice(lowState, hiState);
  const [synthA, setSynthA] = useState({});
  let currentNote = 0;
  let previousNote = 0;
  const rhythmArray = [
    '4n',
    '8n',
    '16n',
    '32n',
    '4t',
    '8t',
    '16t',
    '4n.',
    '8n.',
    '16n.',
    '32n.',
  ];

  const oneShot = () => {
    for (let i = 0; i < numOFNotes; i++) {
      let arrayLength = slicedScale.length;
      let randomNote = slicedScale[randomIndex(0, arrayLength)];
      let incr = Tone.Time({ '8n': i });
      let rhythm = rhythmArray[randomRhythm(0, 10)];
      synthA.triggerAttackRelease(randomNote, rhythm, Tone.now() + incr);
    }
  };

  function randomIndex(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    previousNote = currentNote;
    while (currentNote == previousNote) {
      currentNote = Math.floor(Math.random() * (max - min) + min);
    }
    return currentNote;
  }

  function randomRhythm(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let rhythm = Math.floor(Math.random() * (max - min) + min);
    return rhythm;
  }

  function trigSynthA(time) {
    synthA.triggerAttackRelease(
      selectedRangeOfNotes[randomIndex(0, selectedRangeOfNotes.length)],
      '16n',
      time
    );
  }

  function repeat() {
    console.log('need to set up history array');
  }

  function run() {
    console.log('Start');
    Tone.start();
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
    // startTransport();
    oneShot();
  }

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
      <button
        onClick={repeat}
        className="self-center px-4 py-2 text-green-500 shadow-md rounded-md bg-slate-700"
      >
        Repeat
      </button>
    </>
  );
}
