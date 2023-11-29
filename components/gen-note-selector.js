import { useState, useEffect } from 'react';
import { Scale } from '@tonaljs/tonal';

export default function NoteSelector({
    selectedRangeOfNotes,
    scaleLetter,
    scaleTonality,
    setSelectedRangeOfNotes,
    lowState,
    hiState,
    setHiState,
    setLowState,
}) {
    function getScale() {
        // This is causing an infinite loop. generatedScale will always look different to diffing algo
        let lowerCaseTonality = scaleTonality.toLowerCase();
        let scaleGenerator = Scale.rangeOf(`${scaleLetter} ${lowerCaseTonality}`);
        let generatedScale = scaleGenerator('A2', 'G5'); // beyond this range sounds bad
        setSelectedRangeOfNotes(generatedScale);
    }

    useEffect(() => {
        getScale();
    }, [scaleLetter, scaleTonality]);

    const displayNotes = () => {
        return selectedRangeOfNotes.map((note, index) => (
            <option key={note} value={index}>
                {note}
            </option>
        ));
    };

    return (
        <>
            <div className="flex flex-row">
                <span>Low</span>
                <select
                    id="note-selector-low"
                    className="px-1 mx-1 w-12 h-10 "
                    value={lowState}
                    onChange={(e) => setLowState(e.target.value)}
                >
                    {displayNotes()}
                </select>
                <span>High</span>
                <select
                    id="note-selector-high"
                    className="px-1 mx-1 w-12 h-10"
                    value={hiState}
                    onChange={(e) => setHiState(e.target.value)}
                >
                    {displayNotes()}
                </select>
            </div>
        </>
    );
}
