import { usePoolPhrasesContext } from "./use-poolphrases-context";
import Image from "next/image";
import * as Tone from 'tone';
import { useState, useEffect } from 'react';

export default function Pool() {

    const { poolPhrases, setPoolPhrases, setWorkingPhrases, bpm } = usePoolPhrasesContext();
    const [synthA, setSynthA] = useState({});

    function addToWorkingPhrases(phraseObj) {
        const deepCopy = JSON.parse(JSON.stringify(phraseObj))
        setWorkingPhrases(prev => [...prev, deepCopy])
    }

    function playPhrase(poolPhrase) {
        const phrase = poolPhrase.phrase
        /* poolPhrase.phrase.map(
            noteandtime => phrase.push(noteandtime)
        ) */
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

    function deletePhrase(id) {
        setPoolPhrases(prev => {
            const updatedPhrases = prev.filter(phraseObj => phraseObj.id !== id);
            return updatedPhrases;
        });
    }

    useEffect(() => {
        let synth = new Tone.Synth().toDestination();
        setSynthA(synth);
    }, []);

    return (
        <>
            <div>
                {poolPhrases.map(phraseObj => (
                    < div
                        key={phraseObj.id}
                        className={` rounded-full m-2 px-4 py-1 w-10px h-10px ${phraseObj.color}`}
                    >
                        {phraseObj.phrase.map(noteandtime => noteandtime.note).toString()}
                        <span className="ml-4 cursor-pointer" onClick={() => playPhrase(phraseObj)}>
                            <Image
                                alt="play"
                                src="/play.png"
                                width={20}
                                height={20}
                            />
                        </span>
                        <span className="m-1 cursor-pointer"
                            onClick={() => addToWorkingPhrases(phraseObj)}>
                            <Image
                                alt="work"
                                src="/hammer.png"
                                width={20}
                                height={20}
                            />
                        </span>
                        <span className="m-1 cursor-pointer"
                            onClick={() => deletePhrase(phraseObj.id)} >
                            <Image
                                alt="delete"
                                src="/trash.png"
                                className="rounded-full m-2"
                                width={20}
                                height={20}
                            />
                        </span>
                        <Image
                            alt="save"
                            src="/save.png"
                            className="rounded-full m-2"
                            width={20}
                            height={20}
                        />
                    </div>
                )
                )}
            </div>
        </>
    );
}

