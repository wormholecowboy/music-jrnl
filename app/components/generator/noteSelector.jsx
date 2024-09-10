"use client";
import { useState, useEffect } from "react";
import { Scale } from "@tonaljs/tonal";
import { Slider } from "@mui/material";
import { useGlobalContext } from "../../play/use-global-context";

export default function NoteSelectorSlider({
  fullRangeOfNotes,
  scaleTonality,
  setFullRangeOfNotes,
  setGeneratorHighNote,
  setGeneratorLowNote,
}) {

  const [sliderMax, setSliderMax] = useState([]);
  const [currentSliderSelection, setCurrentSliderSelection] = useState([6, 13]);
  const { scaleLetter } = useGlobalContext();

  function getScale() {
    let scaleGenerator = Scale.rangeOf(`${scaleLetter} ${scaleTonality.toLowerCase()}`);
    let fullScale = scaleGenerator(`${scaleLetter}2`, `${scaleLetter}5`); // beyond this range sounds bad
    const indices = [...Array(fullScale.length).keys()];
    setSliderMax(indices.length - 1);
    setFullRangeOfNotes(fullScale);
  }

  function handleChange(_, newVal) {
    setCurrentSliderSelection(newVal);
    setGeneratorLowNote(newVal[0]);
    setGeneratorHighNote(newVal[1]);
  }

  useEffect(() => {
    getScale();
  }, [scaleLetter, scaleTonality]);

  const marks = fullRangeOfNotes.map((value, index) => ({
    value: index,
    label: value,
  }));

  return (
    <>
      <div className="flex flex-row">
        <Slider
          value={currentSliderSelection}
          min={0}
          max={sliderMax}
          marks={marks}
          onChange={handleChange}
          color="secondary"
          disableSwap={true}
        />
      </div>
    </>
  );
}
