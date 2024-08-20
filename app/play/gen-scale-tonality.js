"use client";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { scalesMasterList } from "../../utils/random";

export default function ScaleTonality({
  scaleTonality,
  setScaleTonality,
  getScale,
}) {
  const handleClick = (e) => {
    setScaleTonality(e.target.value);
  };
  return (
    <div className="self-center">
      <FormControl>
        <InputLabel id="tonality-selector">Tonality</InputLabel>
        <Select
          labelId="tonality-selector"
          variant="outlined"
          id="tonality"
          value={scaleTonality}
          label="Tonality"
          onChange={(e) => handleClick(e)}
        >
          {scalesMasterList.map((scale) => {
       return    (<MenuItem value={scale}>{scale}</MenuItem>) 
          })}
        </Select>
      </FormControl>
    </div>
  );
}
