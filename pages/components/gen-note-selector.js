import { useEffect, useState } from 'react';
import { uuid as note } from 'uuidv4';

export default function NoteSelector(props) {
  const [propsState, setPropsState] = useState(props);

  return (
    <>
      <div className="flex flex-row">
        <span>Low</span>
        <select
          id="note-selector-low"
          className="px-3 mx-3"
          defaultValue={props.selectedRangeOfNotes[0]}
        >
          {props.selectedRangeOfNotes.map((note, index) => {
            <option key={note} value={note}>
              {note}
            </option>;
          })}
        </select>
        <span>High</span>
        <select id="note-selector-high"
          className="px-3 mx-3"
          defaultValue={props.selectedRangeOfNotes[-1]}
        >
          {props.selectedRangeOfNotes.map((note, index) => {
            <option key={note} value={note}>
              {note}
            </option>;
          })}
        </select>
      </div>
    </>
  );
}
