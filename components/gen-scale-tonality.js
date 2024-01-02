import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

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
        <InputLabel id="rest-selector">Rest</InputLabel>
        <Select
          labelId="Rest"
          variant="outlined"
          id="Rest"
          value={scaleTonality}
          label="Rest"
          onChange={(e) => handleClick(e)}
        >
          <MenuItem value="Major">Major</MenuItem>
          <MenuItem value="Minor">Minor</MenuItem>
          <MenuItem value="Blues">Blues</MenuItem>
          <MenuItem value="Dorian">Dorian</MenuItem>
          <MenuItem value="Phrygian">Phrygian</MenuItem>
          <MenuItem value="Lydian">Lydian</MenuItem>
          <MenuItem value="Mixolydian">Mixolydian</MenuItem>
          <MenuItem value="Locrian">Locrian</MenuItem>
          <MenuItem value="Chromatic">Chromatic</MenuItem>
          <MenuItem value="Bebop">Bebop</MenuItem>
          <MenuItem value="Diminished">Diminished</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
