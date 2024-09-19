"use client";
import { useState, useEffect } from "react";
import { Scale } from "@tonaljs/tonal";
import { Slider, ThemeProvider, createTheme } from "@mui/material";
import { useGlobalContext } from "../../play/useGlobalContext";
import { lime, purple } from "@mui/material/colors";

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
  const [displayLowNote, setDisplayLowNote] = useState(fullRangeOfNotes[6]);
  const [displayHiNote, setDisplayHighNote] = useState(fullRangeOfNotes[13]);

  // NOTE: get rid of special numbers above

  function getScale() {
    let scaleGenerator = Scale.rangeOf(
      `${scaleLetter} ${scaleTonality.toLowerCase()}`,
    );
    let fullScale = scaleGenerator(`${scaleLetter}2`, `${scaleLetter}5`); // beyond this range sounds bad
    const indices = [...Array(fullScale.length).keys()];
    setSliderMax(indices.length - 1);
    setFullRangeOfNotes(fullScale);

    setDisplayLowNote(fullScale[6])
    setDisplayHighNote(fullScale[13])
  }

  function handleChange(_, newVal) {
    setCurrentSliderSelection(newVal);
    setGeneratorLowNote(newVal[0]);
    setGeneratorHighNote(newVal[1]);
    setDisplayLowNote(fullRangeOfNotes[newVal[0]]);
    setDisplayHighNote(fullRangeOfNotes[newVal[1]]);
  }

  // NOTE: refactor this into a theme component with the imports above
  const theme = createTheme({
    palette: {
      primary: lime,
      secondary: purple,
    },
  });

  useEffect(() => {
    getScale();
    return () => {
      setDisplayLowNote(fullRangeOfNotes[6]);
      setDisplayHighNote(fullRangeOfNotes[13]);
    };
  }, [scaleLetter, scaleTonality]);

  return (
    <>
      <div className="flex flex-row">
        <span className="mx-3">{displayLowNote}</span>
        <ThemeProvider theme={theme}>
          <Slider
            value={currentSliderSelection}
            min={0}
            max={sliderMax}
            onChange={handleChange}
            color="primary"
            disableSwap={true}
          />
        </ThemeProvider>
        <span className="mx-3">{displayHiNote}</span>
      </div>
    </>
  );
}
