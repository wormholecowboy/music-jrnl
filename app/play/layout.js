import Generator from "app/components/generator/generator";
import WorkingArea from "app/components/working/working";
import React from "react";
import { GlobalContextProvider } from "./useGlobalContext";
import Pool from "app/components/pool/pool";
import Jrnl from "app/components/jrnl/jrnl";

export default function Layout({ children }) {
  return (
    <div className="bg-color1">
      <GlobalContextProvider>
        <div
          id="main-play"
          className="h-screen grid grid-cols-3 grid-rows-4 gap-5 mx-5"
        >
          <div
            id="working"
            className="row-start-1 col-span-3 row-end-2 bg-color2 rounded-md drop-shadow-md"
          >
            <WorkingArea />
          </div>
          <div
            id="generator"
            className="row-start-2 row-end-4 bg-color2 rounded-md drop-shadow-md"
          >
            <Generator />
          </div>
          <div
            id="pool"
            className="row-start-2 row-end-4 bg-color2 rounded-md drop-shadow-md"
          >
            <Pool />
          </div>

          <div
            id="my-vocab"
            className="row-start-2 row-end-4 bg-color2 rounded-md drop-shadow-md"
          >
            <Jrnl />
          </div>
          {children}
        </div>
      </GlobalContextProvider>
    </div>
  );
}
