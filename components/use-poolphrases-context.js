import React, { useContext, useState } from 'react';

const PoolPhrasesContext = React.createContext();

export function usePoolPhrasesContext() {
  return useContext(PoolPhrasesContext);
}

export function PoolPhrasesProvider({ children }) {
  const [poolPhrases, setPoolPhrases] = useState([]);

  const updatePoolPhrases = (newPhrase) => {
    setPoolPhrases((prev) => [...prev, newPhrase]);
    console.log('newphrase', newPhrase);
    console.log(poolPhrases);
  };

  return (
    <>
      <PoolPhrasesContext.Provider value={[poolPhrases, setPoolPhrases]}>
        {children}
      </PoolPhrasesContext.Provider>
    </>
  );
}
