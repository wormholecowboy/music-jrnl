"use client";
import { useGlobalContext } from "../../play/useGlobalContext";
import { Slider, ThemeProvider, createTheme } from "@mui/material";
import { lime, purple } from "@mui/material/colors";

export default function BpmSlider() {
  const handleChange = (_, newValue) => {
    setBpm(newValue);
  };

  // NOTE: refactor this into a theme component with the imports above
  const theme = createTheme({
    palette: {
      primary: lime,
      secondary: purple,
    },
  });

  const { bpm, setBpm } = useGlobalContext();

  return (
    <div className="self-center">
      <p className="text-center text-black">BPM</p>
      <ThemeProvider theme={theme}>
        <Slider
          valueLabelDisplay="auto"
          min={5}
          max={350}
          size="large"
          color="primary"
          onChange={handleChange}
          value={bpm}
        />
      </ThemeProvider>
    </div>
  );
}
