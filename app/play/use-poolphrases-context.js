'use client';
import React, { useContext, useState } from "react";

const PoolPhrasesContext = React.createContext();

export function usePoolPhrasesContext() {
  return useContext(PoolPhrasesContext);
}

export function PoolPhrasesProvider({ children }) {
  const [poolPhrases, setPoolPhrases] = useState([]);
  const [workingPhrases, setWorkingPhrases] = useState([]);
  const [bpm, setBpm] = useState(200);
  const [scaleLetter, setScaleLetter] = useState("B");
  const [updateJrnlPhrases, setUpdateJrnlPhrases] = useState(0);
  const [jrnlPhrases, setJrnlPhrases] = useState([]);

  return (
    <>
      <PoolPhrasesContext.Provider
        value={{
          poolPhrases,
          setPoolPhrases,
          workingPhrases,
          setWorkingPhrases,
          bpm,
          setBpm,
          scaleLetter,
          setScaleLetter,
          updateJrnlPhrases,
          setUpdateJrnlPhrases,
          jrnlPhrases,
          setJrnlPhrases,
        }}
      >
        {children}
      </PoolPhrasesContext.Provider>
    </>
  );
}
