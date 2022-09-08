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
  const [filteredScaleLength, setFilteredScaleLength] = useState(0);
  const [filteredScaleIndicies, setFilteredScaleIndices] = useState({
    min: 0,
    max: filteredScaleLength,
  });
  // TODO: refactor these useStates into objects.
  function getScale() {
    let lowerCaseTonality = scaleTonality.toLowerCase();
    let scaleGenerator = Scale.rangeOf(`${scaleLetter} ${lowerCaseTonality}`);
    let generatedScale = scaleGenerator('A2', 'G5'); // beyond this range sounds bad
    setSelectedRangeOfNotes((prev) => [...generatedScale]);
    console.log('sel range of notes: ', selectedRangeOfNotes);
  }

  useEffect(() => getScale, [scaleLetter, scaleTonality]);

  // useEffect(() => {
  //   setFilteredScale((prev) => [...selectedRangeOfNotes])  ;
  //   setFilteredScaleLength(filteredScale.length - 1);
  //   console.log('filtered: ', filteredScale);
  //   console.log('length: ', filteredScaleLength);
  // }, [selectedRangeOfNotes]);

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
            filteredScaleLength={filteredScaleLength}
            filteredScaleIndicies={filteredScaleIndicies}
            selectedRangeOfNotes={selectedRangeOfNotes}
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
