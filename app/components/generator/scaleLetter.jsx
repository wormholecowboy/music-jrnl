'use client';
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { useGlobalContext } from "../../play/useGlobalContext";

export default function ScaleLetter() {
  const { scaleLetter, setScaleLetter } = useGlobalContext();

  const handleClick = (e) => {
    setScaleLetter(e.target.value);
  };

  return (
    <div className="self-center">
      <FormControl>
        <InputLabel id="letter-selector">Key</InputLabel>
        <Select
          labelId="letter-selector"
          variant="outlined"
          id="letter"
          value={scaleLetter}
          label="Letter"
          onChange={(e) => handleClick(e)}
        >
          <MenuItem value="Ab">Ab</MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="Bb">Bb</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
          <MenuItem value="Db">Db</MenuItem>
          <MenuItem value="D">D</MenuItem>
          <MenuItem value="Eb">Eb</MenuItem>
          <MenuItem value="E">E</MenuItem>
          <MenuItem value="F">F</MenuItem>
          <MenuItem value="Gb">Gb</MenuItem>
          <MenuItem value="G">G</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
