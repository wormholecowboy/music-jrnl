import { useState, useEffect } from 'react';
import { Scale } from '@tonaljs/tonal';

export default function NoteSelector({
  selectedRangeOfNotes,
  scaleLetter,
  scaleTonality,
  setSelectedRangeOfNotes,
}) {
  const [hiState, setHiState] = useState(
    selectedRangeOfNotes[selectedRangeOfNotes.length - 1]
  );
  const [lowState, setLowState] = useState(selectedRangeOfNotes[0]);

  useEffect(() => {
    function getScale() {
      // This is causing an infinite loop. generatedScale will always look different to diffing algo
      let lowerCaseTonality = scaleTonality.toLowerCase();
      let scaleGenerator = Scale.rangeOf(`${scaleLetter} ${lowerCaseTonality}`);
      let generatedScale = scaleGenerator('A2', 'G5'); // beyond this range sounds bad
      setSelectedRangeOfNotes(
        generatedScale,
        console.log(
          'getscale finished',
          scaleLetter,
          scaleTonality,
          selectedRangeOfNotes
        )
      );
    }
  }, [scaleLetter, scaleTonality]);

  const displayNotes = () => {
    return selectedRangeOfNotes.map((note, index) => (
      <option key={note} value={index}>
        {note}
      </option>
    ));
  };

  useEffect(() =>
    console.log('histate from note selector', selectedRangeOfNotes[hiState])
  );

  return (
    <>
      <div className="flex flex-row">
        <span>Low</span>
        <select
          id="note-selector-low"
          className="px-3 mx-3"
          value={selectedRangeOfNotes[lowState]}
        >
          {displayNotes()}
        </select>
        <span>High</span>
        <select
          id="note-selector-high"
          className="px-3 mx-3"
          value={selectedRangeOfNotes[hiState]}
        >
          {displayNotes()}
        </select>
      </div>
    </>
  );
}
