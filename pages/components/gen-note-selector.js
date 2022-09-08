import { useState } from 'react';
import { uuid as note } from 'uuidv4';

export default function NoteSelector(props) {
  // const [value, setValue] = useState([0, props.selectedRangeOfNotes]);

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  const arr = [
    { value: '', text: '--Choose an option--' },
    { value: 'apple', text: 'Apple 🍏' },
    { value: 'banana', text: 'Banana 🍌' },
    { value: 'kiwi', text: 'Kiwi 🥝' },
  ];

  return (
    <>
      <div className="flex flex-row">
        <span>Low</span>
        <select
          onChange={handleChange}
          id="note-selector-low"
          className="px-3 mx-3"
        >
          {props.selectedRangeOfNotes.map((note, index) => {
            <option key={note} value={note}>
              {note}
            </option>;
          })}
        </select>
        <span>High</span>
        <select className="px-3 mx-3">
          {props.selectedRangeOfNotes.map((note, index) => {
            <option key={note} value={note}>
              {note}
            </option>;
          })}
        </select>
      </div>
      <div>
        <select onChange={handleChange} name="fruits" id="fruit-select">
          {arr.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
