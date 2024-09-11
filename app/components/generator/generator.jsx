'use client';
import React, { useState } from "react";
import GenerateButton from "app/components/generator/generateButton";
import NumOFNotesSel from "app/components/generator/numOfNotes";
import BpmSlider from "app/components/generator/bpmSlider";
import ScaleTonality from "app/components/generator/scaleTonality";
import ScaleLetter from "app/components/generator/scaleLetter";
import NoteSelectorSlider from "app/components/generator/noteSelector";
import { initState } from "utils/initState";

export default function Generator() {
  const [fullRangeOfNotes, setFullRangeOfNotes] = useState([]);
  const [numOfNotes, setNumOfNotes] = useState(initState.numOfNotes);
  const [scaleTonality, setScaleTonality] = useState(initState.scaleTonality);
  const [generatorLowNote, setGeneratorLowNote] = useState(initState.noteSelectorLow);
  const [generatorHighNote, setGeneratorHighNote] = useState(initState.noteSelectorHigh);
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
