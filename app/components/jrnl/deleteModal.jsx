import { DialogTitle, Dialog, Button } from "@mui/material";
import deletePhrase from "app/actions/delete-phrase";
import Image from "next/image";

export default function DeleteModal({
  jrnlPhrasesUpdateCounter,
  setJrnlPhrasesUpdateCounter,
  deleteModalOpen,
  setDeleteModalOpen,
  selectedPhrase,
}) {
  async function handleDelete() {
    const phraseId = selectedPhrase.phrase_id;
    await deletePhrase(phraseId);
    setJrnlPhrasesUpdateCounter(jrnlPhrasesUpdateCounter + 1);
    setDeleteModalOpen(false);
  }

  function handleClose() {
    setDeleteModalOpen(false);
  }

  return (
    <Dialog open={deleteModalOpen} onClose={handleClose}>
      <DialogTitle>Delete</DialogTitle>
      <Image src="/john.gif" width={220} height={165} alt="john cena" />
      <p>Deleting {selectedPhrase.name}</p>
      <div className="flex justify-around">
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </Dialog>
  );
}
