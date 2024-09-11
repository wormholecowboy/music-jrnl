'use client';
import React, { useContext, useState } from "react";
import { initState } from "utils/initState";

const GlobalContext = React.createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [poolPhrases, setPoolPhrases] = useState([]);
  const [workingPhrases, setWorkingPhrases] = useState([]);
  const [bpm, setBpm] = useState(initState.bpm);
  const [scaleLetter, setScaleLetter] = useState(initState.scaleLetter);
  const [jrnlPhrasesUpdateCounter, setJrnlPhrasesUpdateCounter] = useState(0);
  const [jrnlPhrases, setJrnlPhrases] = useState([]);

  return (
    <>
      <GlobalContext.Provider
        value={{
          poolPhrases,
          setPoolPhrases,
          workingPhrases,
          setWorkingPhrases,
          bpm,
          setBpm,
          scaleLetter,
          setScaleLetter,
          jrnlPhrasesUpdateCounter,
          setJrnlPhrasesUpdateCounter,
          jrnlPhrases,
          setJrnlPhrases,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
}
