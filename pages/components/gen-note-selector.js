import { useState } from 'react';
import { uuid } from 'uuidv4';

export default function NoteSelector(props) {
  const [value, setValue] = useState([0, props.selectedRangeOfNotes]);

  return (
    <>
      <div className="flex flex-row">
        <span>Low</span>
        <select className="px-3 mx-3">
          {props.selectedRangeOfNotes.map((note) => {
            <option key={uuid()}>{note}</option>;
          })}
        </select>
        <span>High</span>
        <select className="px-3 mx-3">
          {props.selectedRangeOfNotes.map((note) => {
            <option key={uuid()}>{note}</option>;
          })}
        </select>
      </div>
    </>
  );
}
