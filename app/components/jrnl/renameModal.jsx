import { DialogTitle, Dialog, TextField, Button } from "@mui/material";
import updateNameInArray from "utils/updateNameInArray";
import RenamePhrase from "/app/actions/rename-phrase";

export default function RenameModal({
  modalOpen,
  setModalOpen,
  renameValue,
  setRenameValue,
  selectedPhrase,
  setJrnlPhrasesUpdateCounter,
  workingPhrases,
  setWorkingPhrases,
  poolPhrases,
  setPoolPhrases,
}) {
  function handleTextChange(e) {
    setRenameValue(e.target.value);
  }

  function handleClose() {
    setModalOpen(false);
  }

  function handleSubmit() {
    console.log("poolPhrases from handle: ", poolPhrases);
    RenamePhrase(selectedPhrase, renameValue);
    setModalOpen(false);
    setJrnlPhrasesUpdateCounter((prev) => prev + 1);
    setPoolPhrases(updateNameInArray(poolPhrases, selectedPhrase, renameValue));
    setWorkingPhrases(updateNameInArray(workingPhrases, selectedPhrase, renameValue));
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
