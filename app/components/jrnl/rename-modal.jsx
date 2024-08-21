import { DialogTitle, Dialog, TextField, Button } from "@mui/material";
import RenamePhrase from "/app/actions/rename-phrase";

export default function RenameModal({
  modalOpen,
  setModalOpen,
  renameValue,
  setRenameValue,
  selectedPhrase,
  setUpdateJrnlPhrases
}) {
  function handleTextChange(e) {
    setRenameValue(e.target.value);
  }

  function handleClose() {
    setModalOpen(false);
  }

  function handleSubmit() {
    RenamePhrase(selectedPhrase, renameValue);
    setModalOpen(false);
    setUpdateJrnlPhrases(prev => prev + 1)
  }

  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>Rename</DialogTitle>
      <TextField
        autoFocus
        onFocus={(e) => e.target.select()}
        onChange={(e) => handleTextChange(e)}
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
      <Button onClick={handleSubmit}>Confirm</Button>
    </Dialog>
  );
}
