import { useEffect, useState } from 'react';
import { uuid as note } from 'uuidv4';

export default function NoteSelector(props) {
  const getSelectedNotes = (isLow) => {
    const selectedNote = isLow ? props.lowState : props.hiState;
    let selectedRangeOfNotes;
    const lowerBound = props.lowState || 0;
    if (props.hiState) {
      selectedRangeOfNotes = props.selectedRangeOfNotes.slice(
        lowerBound,
        props.hiState
      );
    } else {
      selectedRangeOfNotes = props.selectedRangeOfNotes.slice(lowerBound);
    }
    return selectedRangeOfNotes.map((note, index) => {
      return (
        <option key={index} value={index}>
          {note}
        </option>
      );
    });
  };

  return (
    <>
      <div className="flex flex-row">
        <span>Low</span>
        <select
          id="note-selector-low"
          className="px-3 mx-3"
          value={props.lowState}
          onChange={(e) => {
            props.setLowState(e.target.value);
          }}
        >
          {getSelectedNotes(true)}
        </select>
        <span>High</span>
        <select
          id="note-selector-high"
          className="px-3 mx-3"
          value={props.hiState}
          onChange={(e) => {
            props.setHiState(e.target.value);
          }}
        >
          {getSelectedNotes(false)}
        </select>
      </div>
    </>
  );
}
