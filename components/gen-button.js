import * as Tone from 'tone';
// this can be minimized to 'scale'

export default function GenerateButton({
  selectedRangeOfNotes,
  lowState,
  hiState,
  bpm,
  numOFNotes,
}) {
  const slicedScale = selectedRangeOfNotes.slice(lowState, hiState);
  let currentNote = 0;
  let previousNote = 0;
  const synthA = new Tone.Synth().toDestination();

  const oneShot = () => {
    for (let i = 0; i < numOFNotes; i++) {
      let arrayLength = slicedScale.length;
      let randomNote = slicedScale[randomIndex(0, arrayLength)];
      let incr = Tone.Time({ '8n': i });
      synthA.triggerAttackRelease(randomNote, '16n', Tone.now() + incr);
    }
  };

  function randomIndex(min, max) {
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
      selectedRangeOfNotes[randomIndex(0, selectedRangeOfNotes.length)],
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
