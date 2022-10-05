import { useEffect } from 'react';

export default function NoteSelector({
  selectedRangeOfNotes,
  lowState,
  hiState,
  setLowState,
  setHiState,
}) {
  // const getSelectedNotes = (isLow) => {
  //   const selectedNote = isLow ? lowState : hiState;
  //   let tempRange;
  //   const lowerBound = lowState || 0;
  //   if (hiState) {
  //     tempRange = selectedRangeOfNotes.slice(lowerBound, hiState);
  //   } else {
  //     tempRange = selectedRangeOfNotes.slice(lowerBound);
  //   }
  //   return tempRange.map((note, index) => {
  //     return (
  //       <option key={index} value={index}>
  //         {note}
  //       </option>
  //     );
  //   });
  // };

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
