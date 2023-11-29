import Generator from '../../components/generator';
import Nav from '../../components/nav';
import WorkingArea from '../../components/working';
import React, { useState } from 'react';
import { PoolPhrasesProvider } from '../../components/use-poolphrases-context';
import Pool from '../../components/pool';

export default function PlayIndex() {
    return (
        <>
            <PoolPhrasesProvider>
                <Nav />
                <div
                    id="main-play"
                    className="h-screen grid grid-cols-3 grid-rows-4 gap-5 mx-5"
                >
                    <div id="working" className="row-start-1 col-span-3 row-end-2 bg-purple-300">
                        <WorkingArea />
                    </div>
                    <div id="generator" className="row-start-2 row-end-4 bg-blue-400">
                        <Generator />
                    </div>
                    <div id="pool" className="row-start-2 row-end-4 bg-yellow-300">
                        <Pool />
                    </div>

                    <div id="my-vocab" className="row-start-2 row-end-4 bg-emerald-400">
                        myVocab
                    </div>
                </div>
            </PoolPhrasesProvider>
        </>
    );
}
