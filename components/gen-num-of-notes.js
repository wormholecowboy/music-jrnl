import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

export default function NumOFNotesSel(props) {
  return (
    <div className="self-center my-3">
      <FormControl>
        <InputLabel id="numOFNotes-label">Length</InputLabel>
        <Select
          labelId="numOFNotes-label"
          variant="outlined"
          id="numOFNotes"
          value={props.numOFNotes}
          onChange={(e) => props.setNumOfNotes(e.target.value)}
          label="Length"
          sx={{width: 100}}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="8">8</MenuItem>
          <MenuItem value="9">9</MenuItem>
          <MenuItem value="10">10</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
