import { useState } from 'react';
import { Slider } from '@mui/material';

export default function RangeSlider() {
  const [value, setValue] = useState([20, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };

  return (
    <>
      <Slider min={0} max={100} value={value} onChange={handleChange} />
    </>
  );
}
