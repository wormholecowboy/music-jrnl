import { Scale } from '@tonaljs/tonal';
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

import GenerateButton from './gen-button';
import NumOFNotesSel from './gen-num-of-notes';
import BpmSlider from './gen-bpm-slider';
import ScaleTonality from './gen-scale-tonality';
import NoteSelector from './gen-note-selector';
import ScaleLetter from './gen-scale-letter';

export default function Generator() {
  const [selectedRangeOfNotes, setSelectedRangeOfNotes] = useState([]);
  const [bpm, setBpm] = useState(80);
  const [scaleLetter, setScaleLetter] = useState('B');
  const [numOFNotes, setNumOfNotes] = useState(4);
  const [scaleTonality, setScaleTonality] = useState('Blues');
  const [filteredScale, setFilteredScale] = useState([]);

  function getScale() {
    let lowerCaseTonality = scaleTonality.toLowerCase();
    let scaleGenerator = Scale.rangeOf(`${scaleLetter} ${lowerCaseTonality}`);
    let generatedScale = scaleGenerator('A2', 'G5'); // beyond this range sounds bad
    setSelectedRangeOfNotes((prev) => [...generatedScale]);
  }

  useEffect(() => getScale, [scaleLetter, scaleTonality]);
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
          <NoteSelector />
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
