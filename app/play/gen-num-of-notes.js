"use client";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

export default function NumOFNotesSel(props) {
  const maxNotesAllowed = 20;
  const array = Array.from({ length: maxNotesAllowed }, (_, index) => index + 1);

  return (
    <div className="self-center my-3">
      <FormControl>
        <InputLabel id="numOfNotes-label">Length</InputLabel>
        <Select
          labelId="numOfNotes-label"
          variant="outlined"
          id="numOfNotes"
          value={props.numOfNotes}
          onChange={(e) => props.setNumOfNotes(e.target.value)}
          label="Length"
          sx={{ width: 80 }}
        >
          {array.map((val) => {
            return <MenuItem value={val}>{val}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
