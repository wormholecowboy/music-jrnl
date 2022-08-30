import { Tonal } from '@tonaljs/tonal';
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import GenerateButton from './gen-button';
import NumOFNotesSel from './gen-num-of-notes';
import BpmSlider from './gen-bpm-slider';
import ScaleTonality from './gen-scale-tonality';
import NoteSelector from './gen-note-selector';
import ScaleLetter from './gen-scale-letter';

export default function Generator() {
  const [selectedRangeOfNotes, setSelectedRangeOfNotes] = useState();
  const [bpm, setBpm] = useState(80);
  const [scaleLetter, setScaleLetter] = useState('B');
  const [numOFNotes, setNumOfNotes] = useState(4);
  const [scaleTonality, setScaleTonality] = useState('Blues');

  function OneShot() {
    for (let i = 0; i < numOFNotes; i++) {
      let rng = selectedRangeOfNotes.length;
      let randy = selectedRangeOfNotes[randomNotes(0, rng)];
      console.log('vars: ', rng, randy);
      let incr = Tone.Time({ '8n': i });
      console.log(incr.valueOf());
      synthA.triggerAttackRelease(randy, '16n', Tone.now() + incr);
    }
  }
  // TODO: add the event handlers to all components
  return (
    <>
      <div className="flex flex-col gap-5">
        <GenerateButton bpm={bpm} />
        <ScaleLetter
          scaleLetter={scaleLetter}
          setScaleLetter={setScaleLetter}
          defaultValue={scaleLetter}
        />
        <ScaleTonality
          scaleTonality={scaleTonality}
          setScaleTonality={setScaleTonality}
          defaultValue={scaleTonality}
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="self-center">
          <NoteSelector />
          <NumOFNotesSel
            numOFNotes={numOFNotes}
            setNumOfNotes={setNumOfNotes}
            defaultValue={numOFNotes}
          />
          <BpmSlider defaultValue={bpm} bpm={bpm} setBpm={setBpm} />
        </div>
      </div>
    </>
  );
}
