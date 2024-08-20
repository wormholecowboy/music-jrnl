"use client";
import { usePoolPhrasesContext } from "./use-poolphrases-context";
import Image from "next/image";
import playPhrase from "../../utils/playPhrase";
import { phraseToString } from "../../utils/random";
import insertPhrases from "../actions/insert-phrase";
import { Box } from "@mui/system";

export default function Pool() {
  const {
    poolPhrases,
    setPoolPhrases,
    setWorkingPhrases,
    bpm,
    scaleLetter,
    updateJrnlPhrases,
    setUpdateJrnlPhrases,
  } = usePoolPhrasesContext();

  function addPhraseToJrnl(phraseObj) {
    insertPhrases(phraseObj);
    setUpdateJrnlPhrases(updateJrnlPhrases + 1);
  }

  function addToWorkingPhrases(phraseObj) {
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
              className={`flex items-center rounded-full m-2 px-4 py-1 w-10px h-10px ${phraseObj.color} text-black`}
            >
              {phraseObj.name}
              <div className={"flex items-center justify-around"}>
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
              </div>
            </div>
          ))}
        </Box>
      </div>
    </>
  );
}
