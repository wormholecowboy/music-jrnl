import Image from 'next/image';
import * as Tone from 'tone';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import DraggablePhrase from "./work-draggablePhrase";
import { usePoolPhrasesContext } from "./use-poolphrases-context";
import { useState, useEffect } from 'react';

export default function WorkingArea() {

    const { bpm, workingPhrases, setWorkingPhrases } = usePoolPhrasesContext();
    const [synthA, setSynthA] = useState({});
    const [rest, setRest] = useState({ note: null, time: '4n' })

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
            <h2 className="self-center">Chain your pool phrase together here.</h2>
            <div className="p-3 flex self-center">

                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={workingPhrases} strategy={horizontalListSortingStrategy}>
                        {workingPhrases.map(phraseObj => (
                            <DraggablePhrase id={phraseObj.id} key={phraseObj.id} color={`${phraseObj.color}`} >
                                {phraseObj.phrase.map(noteandtime => noteandtime.note.toString())}
                                < span className='m-1 cursor-pointer' >
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
                <select className='px-2 mx-4'>
                    <option>4n</option>
                    <option>8n</option>
                    <option>16n</option>
                    <option>4n.</option>
                    <option>8n.</option>
                    <option>16n.</option>
                </select>
                <button onClick={() => playPhrase(workingPhrases)} className="self-center px-4 py-2 text-green-500 shadow-md rounded-md bg-slate-700"
                >Play</button>
            </div>
        </div >
    );
}
