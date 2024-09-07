'use client';
import React, { useState } from "react";
import GenerateButton from "./gen-button";
import NumOFNotesSel from "./gen-num-of-notes";
import BpmSlider from "./gen-bpm-slider";
import ScaleTonality from "./gen-scale-tonality";
import ScaleLetter from "./gen-scale-letter";
import NoteSelectorSlider from "./gen-note-selector-slider";

export default function Generator() {
  const [fullRangeOfNotes, setFullRangeOfNotes] = useState([]);
  const [numOfNotes, setNumOfNotes] = useState(7);
  const [scaleTonality, setScaleTonality] = useState("Chromatic");
  const [generatorLowNote, setGeneratorLowNote] = useState(6);
  const [generatorHighNote, setGeneratorHighNote] = useState(13);
  const [currentPhrase, setCurrentPhrase] = useState(null);

  return (
    <>
      <div className="flex flex-col gap-5 mt-5">
        <GenerateButton
          numOfNotes={numOfNotes}
          generatorHighNote={generatorHighNote}
          generatorLowNote={generatorLowNote}
          currentPhrase={currentPhrase}
          setCurrentPhrase={setCurrentPhrase}
          scaleTonality={scaleTonality}
        />
        <div className="self-center flex flex-row gap-2 my-3">
          <ScaleLetter />
          <ScaleTonality
            scaleTonality={scaleTonality}
            setScaleTonality={setScaleTonality}
          />
          <NumOFNotesSel
            numOfNotes={numOfNotes}
            setNumOfNotes={setNumOfNotes}
          />
        </div>
      </div>
      <div className="flex flex-row gap-5 justify-around"></div>
      <div className="px-5">
        <NoteSelectorSlider
          fullRangeOfNotes={fullRangeOfNotes}
          setFullRangeOfNotes={setFullRangeOfNotes}
          scaleTonality={scaleTonality}
          setGeneratorHighNote={setGeneratorHighNote}
          setGeneratorLowNote={setGeneratorLowNote}
        />
      </div>
      <div className="px-20">
        <BpmSlider />
      </div>
    </>
  );
}
