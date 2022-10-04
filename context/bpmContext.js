import { createContext, useContext, useState } from 'react';

const bpmContext = createContext();

export function useBpmContext() {
  return useContext(bpmContext);
}

export function bpmContextProvider({ children }) {
  return;
}
