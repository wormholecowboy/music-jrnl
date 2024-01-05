import { useState, useEffect } from "react";
import { Scale } from "@tonaljs/tonal";
import { MenuItem, Slider } from "@mui/material";

export default function NoteSelectorSlider({
  selectedRangeOfNotes,
  scaleLetter,
  scaleTonality,
  setSelectedRangeOfNotes,
  lowState,
  hiState,
  setHiState,
  setLowState,
  setSelectedNotes,
  selectedNotes,
}) {
  const [numArray, setNumArray] = useState([]);

  function getScale() {
    // This is causing an infinite loop. generatedScale will always look different to diffing algo
    let lowerCaseTonality = scaleTonality.toLowerCase();
    let scaleGenerator = Scale.rangeOf(`${scaleLetter} ${lowerCaseTonality}`);
    let generatedScale = scaleGenerator("A2", "G5"); // beyond this range sounds bad
    const tempArray = [...Array(generatedScale.length).keys()];
    setNumArray(tempArray);
    setSelectedRangeOfNotes(generatedScale);
  }

  const marks = selectedRangeOfNotes.map((value, index) => ({
    value: index,
    label: value,
  }));

  function handleChange(_, newVal) {
    //
  }

  useEffect(() => {
    getScale();
  }, [scaleLetter, scaleTonality]);

  console.log("numarrary: ", numArray);
  console.log("selectedRangeOfNotes", selectedRangeOfNotes);
  return (
    <>
      <div className="flex flex-row">
        <Slider
          value={[0, numArray.length - 1]}
          min={0}
          max={numArray.length - 1}
          marks={marks}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
