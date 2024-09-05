'use client';
import React, { useContext, useState } from "react";

const GlobalContext = React.createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [poolPhrases, setPoolPhrases] = useState([]);
  const [workingPhrases, setWorkingPhrases] = useState([]);
  const [bpm, setBpm] = useState(200);
  const [scaleLetter, setScaleLetter] = useState("B");
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
