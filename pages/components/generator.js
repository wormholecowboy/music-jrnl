import { Tonal } from '@tonaljs/tonal';
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import RangeSlider from './gen-range-slider';
import { Slider } from '@mui/material';

export default function Generator() {
  const [selectedRangeOfNotes, setSelectedRangeOfNotes] = useState();
  const [speed, setSpeed] = useState(80);

  function Generate() {
    function startTransport() {
      Tone.Transport.bpm.value = speed;
      Tone.Transport.start();
    }

    function run() {
      console.log('Start');
      Tone.start();
      startTransport();
      oneShot();
    }

    return (
      <button className="self-center px-4 py-2 text-green-500 shadow-md rounded-md bg-slate-500">
        Generate
      </button>
    );
  }

  function ScaleLetter() {
    return (
      <div className="self-center">
        <span>Key</span>
        <select className="self-center">
          <option>Ab</option>
          <option>A</option>
          <option>Bb</option>
          <option selected>B</option>
          <option>C</option>
          <option>Db</option>
          <option>D</option>
          <option>Eb</option>
          <option>F</option>
          <option>Gb</option>
          <option>G</option>
        </select>
      </div>
    );
  }

  function ScaleTonality() {
    return (
      <div className="self-center">
        <span>Scale Type</span>{' '}
        <select className="self-center">
          <option value="major">Major</option>
          <option value="minor">Minor</option>
          <option value="blues" selected>
            Blues
          </option>
        </select>
      </div>
    );
  }

  function NoteSelector() {
    return (
      <>
        <RangeSlider />
      </>
    );
  }

  function BpmSlider() {
    const [bpm, setBpm] = useState(80);

    const handleChange = (event, newValue) => {
      setBpm(newValue);
    };

    return (
      <div className="self-center">
        <p className="text-center">BPM</p>
        <Slider
          valueLabelDisplay="auto"
          min={10}
          max={280}
          onChange={handleChange}
          value={bpm}
        />
      </div>
    );
  }

  function NumOFNotesSel() {
    const [numOfNotes, setNumOfNotes] = useState(3);
    return (
      <div className="self-center">
        <span>Number of Notes</span>
        <select className="self-center">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option selected>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
      </div>
    );
  }

  function OneShot() {
    for (let i = 0; i < numOFNotes; i++) {
      let rng = selectedRangeOfNotes.length;
      let randy = selectedRangeOfNotes[randomNotes(0, rng)];
      console.log('vars: ', rng, randy);
      let incr = Tone.Time({ '8n': i });
      console.log(incr.valueOf());
      synthA.triggerAttackRelease(randy, '16n', Tone.now() + incr);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <Generate />
        <ScaleLetter />
        <ScaleTonality />
      </div>
      <div className="flex flex-col gap-5">
        <div className="self-center">
          <NoteSelector />
          <NumOFNotesSel />
          <BpmSlider />
        </div>
      </div>
    </>
  );
}
