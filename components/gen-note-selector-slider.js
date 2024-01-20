import { useState, useEffect } from "react";
import { Scale } from "@tonaljs/tonal";
import { Slider } from "@mui/material";
import { usePoolPhrasesContext } from "./use-poolphrases-context";
import { red } from "@mui/material/colors";

export default function NoteSelectorSlider({
  selectedRangeOfNotes,
  scaleTonality,
  setSelectedRangeOfNotes,
  lowState,
  hiState,
  setHiState,
  setLowState,
}) {
  const [indexArray, setIndexArray] = useState([]);
  const [selected, setSelected] = useState([6, 13]);
  const { scaleLetter } = usePoolPhrasesContext();

  function getScale() {
    let lowerCaseTonality = scaleTonality.toLowerCase();
    let scaleGenerator = Scale.rangeOf(`${scaleLetter} ${lowerCaseTonality}`);
    let generatedScale = scaleGenerator(`${scaleLetter}2`, `${scaleLetter}5`); // beyond this range sounds bad
    const indices = [...Array(generatedScale.length).keys()];
    console.log("note selector");
    console.log("generatedScale:", generatedScale);
    // NOTE: maybe detect the scale and then generate both scales using a tonic at the bottom to keep aligned

    setIndexArray(indices);
    setSelectedRangeOfNotes(generatedScale);
  }

  const marks = selectedRangeOfNotes.map((value, index) => ({
    value: index,
    label: value,
  }));

  function handleChange(_, newVal) {
    setSelected(newVal);
    setLowState(newVal[0]);
    setHiState(newVal[1]);
    console.log("newvalhi: ", newVal[1]);
    console.log("newvallo: ", newVal[0]);
  }

  useEffect(() => {
    getScale();
  }, [scaleLetter, scaleTonality]);

  return (
    <>
      <div className="flex flex-row">
        <Slider
          value={selected}
          min={0}
          max={indexArray.length - 1}
          marks={marks}
          onChange={handleChange}
          color="secondary"
          disableSwap={true}
        />
      </div>
    </>
  );
}
