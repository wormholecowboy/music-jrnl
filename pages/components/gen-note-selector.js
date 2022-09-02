import { Slider } from '@mui/material';
import { useState } from 'react';

export default function NoteSelector(props) {
  const [value, setValue] = useState([0, props.filteredScaleLength]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };

  return (
    <>
      <Slider
        min={0}
        max={props.selectedRangeOfNotes}
        value={value}
        valueLabelDisplay="auto"
        onChange={handleChange}
      />
    </>
  );
}
