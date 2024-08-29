import Image from "next/image";
import insertPhrases from "../../actions/insert-phrase";
import { usePoolPhrasesContext } from "../../play/use-poolphrases-context";

export default function SaveButton({ jrnlPhrases, phraseObj }) {
  const { updateJrnlPhrases, setUpdateJrnlPhrases } = usePoolPhrasesContext();

  function addPhraseToJrnl(phraseObj) {
    insertPhrases(phraseObj);
    setUpdateJrnlPhrases(updateJrnlPhrases + 1);
  }

  const isSaved = jrnlPhrases.some(
    (jrnlPhraseObj) => jrnlPhraseObj.phrase_id === phraseObj.phrase_id,
  );

  const saveButton = isSaved ? null : (
    <span
      className="m-1 cursor-pointer"
      onClick={() => {
        addPhraseToJrnl(phraseObj);
      }}
    >
      <Image
        alt="save"
        src="/save.png"
        className="rounded-full m-2"
        width={20}
        height={20}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </span>
  );

  return saveButton;
}
