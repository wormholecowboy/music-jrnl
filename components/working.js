import Image from 'next/image';
import { InputLabel, Select, MenuItem, TextField, FormControl } from '@mui/material';
import * as Tone from 'tone';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import DraggablePhrase from "./work-draggablePhrase";
import { usePoolPhrasesContext } from "./use-poolphrases-context";
import { useState, useEffect } from 'react';

export default function WorkingArea() {

    const { bpm, workingPhrases, setWorkingPhrases } = usePoolPhrasesContext();
    const [synthA, setSynthA] = useState({});
    const [rest, setRest] = useState('4n')

    function removeRest(idx) {
        const newWorkingPhrases = [...workingPhrases]
        newWorkingPhrases[idx].phrase.pop()
        setWorkingPhrases(newWorkingPhrases)
    }

    function addRest(idx, time) {
        const rest = { note: null, time: time };
        const newWorkingPhrases = [...workingPhrases]
        newWorkingPhrases[idx].phrase.push(rest)

        setWorkingPhrases(newWorkingPhrases)
    }

    function deletePhrase(id) {
        console.log('run del prhase')
        setWorkingPhrases(prev => {
            const updatedPhrases = prev.filter(phraseObj => phraseObj.id !== id);
            return updatedPhrases;
        });
    }

    function playPhrase(workingPhrases) {
        const phrase = []
        workingPhrases.map(phraseObj => {
            phraseObj.phrase.map(noteandtime => phrase.push(noteandtime))
        })
        Tone.Transport.bpm.value = bpm;
        let delay = Tone.now();
        for (let i = 0; i < phrase.length; i++) {
            let time = phrase[i].time;
            delay += Tone.Time(time).toSeconds();
            synthA.triggerAttackRelease(
                phrase[i].note,
                phrase[i].time,
                delay
            );
        }
    }


    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setWorkingPhrases((phrases) => {
                const activeIndex = phrases.findIndex((p) => p.id === active.id);
                const overIndex = phrases.findIndex((p) => p.id === over.id);

                return arrayMove([...phrases], activeIndex, overIndex);
            });
        }
    }

    useEffect(() => {
        let synth = new Tone.Synth().toDestination();
        setSynthA(synth);
    }, []);

    return (
        <div className="flex flex-col justify-center justify-items-center">
            <div className="p-3 flex self-center">

                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={workingPhrases} strategy={horizontalListSortingStrategy}>
                        {workingPhrases.map((phraseObj, idx) => (
                            <DraggablePhrase id={phraseObj.id} key={phraseObj.id} color={`${phraseObj.color}`} >
                                {phraseObj.phrase.map((noteandtime) => {
                                    if (noteandtime.note === null) return `_${noteandtime.time.toString()}`;
                                    return noteandtime.note.toString();
                                })}
                                < span className='m-1 cursor-pointer'
                                    onClick={() => removeRest(idx)} >
                                    <Image
                                        alt="minus"
                                        src="/../public/minus.png"
                                        className="rounded-full m-2"
                                        width={20}
                                        height={20}
                                    />
                                </span>
                                < span className='m-1 cursor-pointer'
                                    onClick={() => addRest(idx, rest)} >
                                    <Image
                                        alt="rest"
                                        src="/../public/rest.png"
                                        className="rounded-full m-2"
                                        width={20}
                                        height={20}
                                    />
                                </span>
                                <span className='m-1 cursor-pointer'
                                    onClick={() => deletePhrase(phraseObj.id)}>
                                    <Image
                                        alt="delete"
                                        src="/../public/trash.png"
                                        className="rounded-full m-2"
                                        width={20}
                                        height={20}
                                    />
                                </span>
                            </DraggablePhrase>
                        ))
                        }
                    </SortableContext>
                </DndContext>
            </div >
            <div className="flex flex-row justify-center" >
                <FormControl >
                    <InputLabel id="rest-selector">Rest</InputLabel>
                    <Select
                        labelId="Rest"
                        variant="outlined"
                        id="Rest"
                        value={rest}
                        label="Rest"
                        onChange={(e) => setRest(e.target.value)}
                    >
                        <MenuItem value='2n'>2n</MenuItem>
                        <MenuItem value='4n'>4n</MenuItem>
                        <MenuItem value='8n'>8n</MenuItem>
                        <MenuItem value='16n'>16n</MenuItem>
                        <MenuItem value='4n.'>4n.</MenuItem>
                        <MenuItem value='2n.'>2n.</MenuItem>
                        <MenuItem value='8n.'>8n.</MenuItem>
                        <MenuItem value='16n.'>16n.</MenuItem>
                    </Select>
                </FormControl>
                <button onClick={() => playPhrase(workingPhrases)} className="self-center px-4 py-2 mx-4 text-color4 shadow-md rounded-md bg-color5 border-2 border-color4"
                >Play</button>
            </div>
        </div >
    );
}
