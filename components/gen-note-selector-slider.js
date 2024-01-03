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
    console.log("temp: ", tempArray);
  }

  useEffect(() => {
    getScale();
  }, [scaleLetter, scaleTonality]);

  const displayNotes = () => {
    return selectedRangeOfNotes.map((note, index) => (
      <MenuItem key={note} value={index}>
        {note}
      </MenuItem>
    ));
  };

  console.log("selectedRangeOfNotes", selectedRangeOfNotes);
  return (
    <>
      <div className="flex flex-row">
        <Slider
          value={selectedRangeOfNotes.indexOf(selectedNotes)}
          valueLabelDisplay="on"
        />
      </div>
    </>
  );
}
