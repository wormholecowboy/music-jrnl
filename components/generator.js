import React, { useEffect, useState } from 'react';
// import * as Tone from 'tone';

import GenerateButton from './gen-button';
import NumOFNotesSel from './gen-num-of-notes';
import BpmSlider from './gen-bpm-slider';
import ScaleTonality from './gen-scale-tonality';
import NoteSelector from './gen-note-selector';
import ScaleLetter from './gen-scale-letter';

// TODO: create a useEffect to set hi and low state to -1 and 0, watches the selectedRangeOfNotes,
export default function Generator() {
  const [selectedRangeOfNotes, setSelectedRangeOfNotes] = useState([]);
  const [bpm, setBpm] = useState(80);
  const [scaleLetter, setScaleLetter] = useState('B');
  const [numOFNotes, setNumOfNotes] = useState(4);
  const [scaleTonality, setScaleTonality] = useState('Blues');

  return (
    <>
      <div className="flex flex-col gap-5">
        <GenerateButton bpm={bpm} />
        <ScaleLetter
          scaleLetter={scaleLetter}
          setScaleLetter={setScaleLetter}
        />
        <ScaleTonality
          scaleTonality={scaleTonality}
          setScaleTonality={setScaleTonality}
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="self-center">
          <NoteSelector
            selectedRangeOfNotes={selectedRangeOfNotes}
            setSelectedRangeOfNotes={setSelectedRangeOfNotes}
            scaleTonality={scaleTonality}
            scaleLetter={scaleLetter}
          />
          <NumOFNotesSel
            numOFNotes={numOFNotes}
            setNumOfNotes={setNumOfNotes}
          />
          <BpmSlider bpm={bpm} setBpm={setBpm} />
        </div>
      </div>
    </>
  );
}
