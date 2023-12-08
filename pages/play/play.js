import Generator from '../../components/generator';
import Nav from '../../components/nav';
import WorkingArea from '../../components/working';
import React, { useState } from 'react';
import { PoolPhrasesProvider } from '../../components/use-poolphrases-context';
import Pool from '../../components/pool';

export default function PlayIndex() {
    return (
        <div className='bg-color1'>
            <PoolPhrasesProvider>
                <Nav />
                <div
                    id="main-play"
                    className="h-screen grid grid-cols-3 grid-rows-4 gap-5 mx-5"
                >
                    <div id="working" className="row-start-1 col-span-3 row-end-2 bg-color2 rounded-md drop-shadow-md">
                        <WorkingArea />
                    </div>
                    <div id="generator" className="row-start-2 row-end-4 bg-color2 rounded-md drop-shadow-md">
                        <Generator />
                    </div>
                    <div id="pool" className="row-start-2 row-end-4 bg-color2 rounded-md drop-shadow-md">
                        <Pool />
                    </div>

                    <div id="my-vocab" className="row-start-2 row-end-4 bg-color2 rounded-md drop-shadow-md">
                    </div>
                </div>
            </PoolPhrasesProvider>
        </div>
    );
}
