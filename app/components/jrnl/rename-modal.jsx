import { DialogTitle, Dialog, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function RenameModal({ modalOpen, setModalOpen, renameValue, setRenameValue }) {
  function handleTextChange(e) {
    setRenameValue(e.target.value);
  }

  function handleClose() {
    setModalOpen(false);
  }

  return (
    <Dialog open={modalOpen}>
      <DialogTitle>Rename</DialogTitle>
      <TextField
        autoFocus
        onFocus={e => e.target.select()}
        onChange={e => handleTextChange(e)}
        required
        value={renameValue}
        margin="dense"
        id="new-name"
        name="new-name"
        label="New Name"
        type="string"
        fullWidth
        variant="standard"
      />
      <Button onClick={handleClose}>Cancel</Button>
      <Button type="submit">Confirm</Button>
    </Dialog>
  );
}
