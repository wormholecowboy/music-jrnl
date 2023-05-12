import React, { useContext, useState } from 'react';

const PoolPhrasesContext = React.createContext();
const setPoolPhrasesContext = React.createContext();

export function usePoolPhrasesContext() {
  return useContext(PoolPhrasesContext);
}

// export function useSetPoolPhrasesContext() {
//   return useContext(PoolPhrasesContext);
// }

export function PoolPhrasesProvider({ children }) {
  const [poolPhrases, setPoolPhrases] = useState([]);

  const updatePoolPhrases = (newPhrase) => {
    setPoolPhrases((prev) => ({ ...prev, newPhrase }));
  };

  return (
    <>
      <PoolPhrasesContext.Provider value={{ poolPhrases, updatePoolPhrases }}>
        {children}
      </PoolPhrasesContext.Provider>
    </>
  );
}
