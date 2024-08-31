'use client';
import React, { useState } from "react";
import GenerateButton from "./gen-button";
import NumOFNotesSel from "./gen-num-of-notes";
import BpmSlider from "./gen-bpm-slider";
import ScaleTonality from "./gen-scale-tonality";
import ScaleLetter from "./gen-scale-letter";
import NoteSelectorSlider from "./gen-note-selector-slider";

export default function Generator() {
  const [selectedRangeOfNotes, setSelectedRangeOfNotes] = useState([]);
  const [numOFNotes, setNumOfNotes] = useState(7);
  const [scaleTonality, setScaleTonality] = useState("Blues");
  const [lowState, setLowState] = useState(6);
  const [hiState, setHiState] = useState(13);
  const [currentPhrase, setCurrentPhrase] = useState(null);

  return (
    <>
      <div className="flex flex-col gap-5 mt-5">
        <GenerateButton
          numOFNotes={numOFNotes}
          selectedRangeOfNotes={selectedRangeOfNotes}
          hiState={hiState}
          lowState={lowState}
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
            numOFNotes={numOFNotes}
            setNumOfNotes={setNumOfNotes}
          />
        </div>
      </div>
      <div className="flex flex-row gap-5 justify-around"></div>
      <div className="px-5">
        <NoteSelectorSlider
          selectedRangeOfNotes={selectedRangeOfNotes}
          setSelectedRangeOfNotes={setSelectedRangeOfNotes}
          scaleTonality={scaleTonality}
          hiState={hiState}
          lowState={lowState}
          setHiState={setHiState}
          setLowState={setLowState}
        />
      </div>
      <div className="px-20">
        <BpmSlider />
      </div>
    </>
  );
}
