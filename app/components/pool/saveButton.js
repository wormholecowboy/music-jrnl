import Image from "next/image";
import insertPhrases from "app/actions/insert-phrase";
import { useGlobalContext } from "../../play/useGlobalContext";
import useSession from "utils/supabase/use-session";

export default function SaveButton({ jrnlPhrases, phraseObj }) {
  const { jrnlPhrasesUpdateCounter, setJrnlPhrasesUpdateCounter } = useGlobalContext();

  function addPhraseToJrnl(phraseObj) {
    insertPhrases(phraseObj);
    setJrnlPhrasesUpdateCounter(jrnlPhrasesUpdateCounter + 1);
  }

  const isSaved = jrnlPhrases?.some(
    (jrnlPhraseObj) => jrnlPhraseObj.phrase_id === phraseObj.phrase_id,
  );

  const session = useSession();
  const saveButton = isSaved || !session ? null : (
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
