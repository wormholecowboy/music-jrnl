import { useState, useEffect } from "react";
import { Scale } from "@tonaljs/tonal";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

export default function NoteSelector({
  selectedRangeOfNotes,
  scaleLetter,
  scaleTonality,
  setSelectedRangeOfNotes,
  lowState,
  hiState,
  setHiState,
  setLowState,
}) {
  function getScale() {
    // This is causing an infinite loop. generatedScale will always look different to diffing algo
    let lowerCaseTonality = scaleTonality.toLowerCase();
    let scaleGenerator = Scale.rangeOf(`${scaleLetter} ${lowerCaseTonality}`);
    let generatedScale = scaleGenerator("A2", "G5"); // beyond this range sounds bad
    setSelectedRangeOfNotes(generatedScale);
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

  return (
    <>
      <div className="flex flex-row">
        <FormControl>
          <InputLabel id="low-label">Low Note</InputLabel>
          <Select
            id="low"
            sx={{width:100}}
            value={lowState}
            onChange={(e) => setLowState(e.target.value)}
            labelId="low-label"
            variant="outlined"
            label="Low"
          >
            {displayNotes()}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="hi-label">High Note</InputLabel>
          <Select
            id="high"
            sx={{width:100}}
            value={hiState}
            onChange={(e) => setHiState(e.target.value)}
            labelId="hi-label"
            variant="outlined"
            label="High"
          >
            {displayNotes()}
          </Select>
        </FormControl>
      </div>
    </>
  );
}
