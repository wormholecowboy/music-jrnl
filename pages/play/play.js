import Generator from '../../components/generator';
import Nav from '../../components/nav';
import WorkingArea from '../../components/working';
import React, { useState } from 'react';

export default function playIndex() {
  const [poolPhrases, setPoolPhrases] = useState([]);
  return (
    <>
      <Nav />
      <div
        id="main-play"
        className="h-screen grid grid-cols-2 grid-rows-4 gap-5 mx-20"
      >
        <div id="working" className="col-span-full row-start-1 row-end-2">
          <WorkingArea poolPhrases={poolPhrases} />
        </div>
        <div id="generator" className="row-start-2 row-end-4 bg-blue-400">
          Generator
          <Generator poolPhrases={poolPhrases} />
        </div>

        <div
          poolPhrases={poolPhrases}
          id="my-vocab"
          className="row-start-2 row-end-4 bg-green-400"
        >
          myVocab
        </div>
      </div>
    </>
  );
}
