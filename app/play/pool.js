"use client";
import { useGlobalContext } from "./use-global-context";
import Image from "next/image";
import playPhrase from "../../utils/playPhrase";
import { phraseToString } from "../../utils/random";
import insertPhrases from "../actions/insert-phrase";
import { Box } from "@mui/system";
import SaveButton from "../components/pool/saveButton";
import phraseAlreadyInList from "../../utils/phraseAlreadyInList";

export default function Pool() {
  const {
    poolPhrases,
    setPoolPhrases,
    workingPhrases,
    setWorkingPhrases,
    bpm,
    scaleLetter,
    jrnlPhrases,
  } = useGlobalContext();

  function addToWorkingPhrases(phraseObj) {
    if (phraseAlreadyInList(phraseObj, workingPhrases)) {
      window.alert("Phrase is already in your list.");
      return;
    }
    const deepCopy = JSON.parse(JSON.stringify(phraseObj));
    setWorkingPhrases((prev) => [...prev, deepCopy]);
  }

  function handlePlayClick(phraseObj) {
    playPhrase(phraseObj, scaleLetter, bpm);
  }

  function deletePhrase(id) {
    console.log("id: ", id);
    setPoolPhrases((prev) => {
      console.log("prev: ", prev);
      const filtered = prev.filter((phraseObj) => phraseObj.phrase_id !== id);
      console.log("filtered: ", filtered);
      return prev.filter((phraseObj) => phraseObj.phrase_id !== id);
    });
  }

  return (
    <>
      <div>
        <Box
          sx={{
            maxHeight: 450,
            overflowY: "auto",
          }}
        >
          {poolPhrases.map((phraseObj) => (
            <div
              title={phraseToString(phraseObj.phrase)}
              key={phraseObj.phrase_id}
              className={`flex rounded-full m-2 px-4 py-1 w-10px items-center h-10px ${phraseObj.color} text-black`}
            >
              {phraseObj.name}
              <div className={"flex justify-around items-center ml-auto"} id="temp">
                <span
                  className="ml-4 cursor-pointer"
                  onClick={() => handlePlayClick(phraseObj)}
                >
                  <Image
                    alt="play"
                    src="/play.png"
                    width={20}
                    height={20}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </span>
                <span
                  className="m-1 cursor-pointer"
                  onClick={() => addToWorkingPhrases(phraseObj)}
                >
                  <Image
                    alt="work"
                    src="/hammer.png"
                    width={20}
                    height={20}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </span>
                <span
                  className="m-1 cursor-pointer"
                  onClick={() => deletePhrase(phraseObj.phrase_id)}
                >
                  <Image
                    alt="delete"
                    src="/trash.png"
                    className="rounded-full m-2"
                    width={20}
                    height={20}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </span>
                <SaveButton phraseObj={phraseObj} jrnlPhrases={jrnlPhrases} />
              </div>
            </div>
          ))}
        </Box>
      </div>
    </>
  );
}
