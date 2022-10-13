import * as Tone from 'tone';

export default function GenerateButton({
  selectedRangeOfNotes,
  lowState,
  hiState,
  bpm,
  numOFNotes,
}) {
  const oneShot = () => {
    for (let i = 0; i < numOFNotes; i++) {
      let rng = selectedRangeOfNotes.length;
      let randy = selectedRangeOfNotes[randomNotes(0, rng)];
      console.log('vars: ', rng, randy);
      let incr = Tone.Time({ '8n': i });
      console.log(incr.valueOf());
      synthA.triggerAttackRelease(randy, '16n', Tone.now() + incr);
    }
    // synthA.triggerAttackRelease('C4', '32n');
  };

  const synthA = new Tone.Synth().toDestination();
  let currentNote = 0;
  let previousNote = 0;

  let slicedScale = selectedRangeOfNotes.slice(lowState, hiState);
  // TODO: add the sliced scale to the generator

  // Grab random notes
  function randomNotes(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    previousNote = currentNote;

    while (currentNote == previousNote) {
      currentNote = Math.floor(Math.random() * (max - min) + min);
    }
    return currentNote;
  }

  function trigSynthA(time) {
    synthA.triggerAttackRelease(
      selectedRangeOfNotes[randomNotes(0, selectedRangeOfNotes.length)],
      '16n',
      time
    );
  }

  function run() {
    console.log('Start');
    Tone.start();
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
    // startTransport();
    oneShot();
  }

  return (
    <button
      onClick={run}
      className="self-center px-4 py-2 text-green-500 shadow-md rounded-md bg-slate-700"
    >
      Generate
    </button>
  );
}
