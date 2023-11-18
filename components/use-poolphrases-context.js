import React, { useContext, useState } from "react";

const PoolPhrasesContext = React.createContext();

export function usePoolPhrasesContext() {
    return useContext(PoolPhrasesContext);
}

export function PoolPhrasesProvider({ children }) {
    const [poolPhrases, setPoolPhrases] = useState([]);
    const [workingPhrases, setWorkingPhrases] = useState(["something", "another thing"])

    return (
        <>
            <PoolPhrasesContext.Provider value={{ poolPhrases, setPoolPhrases, workingPhrases, setWorkingPhrases }}>
                {children}
            </PoolPhrasesContext.Provider>
        </>
    );
}
