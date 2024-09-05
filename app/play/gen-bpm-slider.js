'use client';
import { Slider } from "@mui/material";
import { useGlobalContext } from "./use-global-context";

export default function BpmSlider(props) {
  const handleChange = (event, newValue) => {
    setBpm(newValue);
  };

  const { bpm, setBpm } = useGlobalContext();

  return (
    <div className="self-center">
      <p className="text-center text-black">BPM</p>
      <Slider
        valueLabelDisplay="auto"
        min={5}
        max={350}
        size="large"
        color="secondary"
        onChange={handleChange}
        value={bpm}
      />
    </div>
  );
}
