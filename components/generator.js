import React, { useEffect, useState } from 'react';

import GenerateButton from './gen-button';
import NumOFNotesSel from './gen-num-of-notes';
import BpmSlider from './gen-bpm-slider';
import ScaleTonality from './gen-scale-tonality';
import NoteSelector from './gen-note-selector';
import ScaleLetter from './gen-scale-letter';

// TODO: add the 'repeat phrase' button

export default function Generator() {
    const [selectedRangeOfNotes, setSelectedRangeOfNotes] = useState([]);
    const [scaleLetter, setScaleLetter] = useState('B');
    const [numOFNotes, setNumOfNotes] = useState(7);
    const [scaleTonality, setScaleTonality] = useState('Blues');
    const [lowState, setLowState] = useState(6);
    const [hiState, setHiState] = useState(13);
    const [currentPhrase, setCurrentPhrase] = useState([]);

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
                />
                <div className="self-center flex flex-row gap-2 my-3">
                    <ScaleLetter
                        scaleLetter={scaleLetter}
                        setScaleLetter={setScaleLetter}
                    />
                    <ScaleTonality
                        scaleTonality={scaleTonality}
                        setScaleTonality={setScaleTonality}
                    />
                </div>
            </div>
            <div className="flex flex-row gap-5 justify-around">
                <NoteSelector
                    selectedRangeOfNotes={selectedRangeOfNotes}
                    setSelectedRangeOfNotes={setSelectedRangeOfNotes}
                    scaleTonality={scaleTonality}
                    scaleLetter={scaleLetter}
                    hiState={hiState}
                    lowState={lowState}
                    setHiState={setHiState}
                    setLowState={setLowState}
                />
                <NumOFNotesSel
                    numOFNotes={numOFNotes}
                    setNumOfNotes={setNumOfNotes}
                />
            </div>
            <div className='px-20'>
                <BpmSlider />
            </div>
        </>
    );
}
