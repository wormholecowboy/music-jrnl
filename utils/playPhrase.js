import * as Tone from "tone";
import { Interval, transpose } from "@tonaljs/tonal";

function transposePhrase(phraseObj, scaleLetter) {
  const phrase = phraseObj.phrase;
  const dist = Interval.distance("C", scaleLetter);

  const transposedPhrase = [];
  for (const noteandtime of phrase) {
    if (noteandtime.note === null) {
      transposedPhrase.push(noteandtime);
      continue;
    }

    const newNote = transpose(noteandtime.note, dist);
    const time = noteandtime.time;
    transposedPhrase.push({ note: newNote, time: time });
  }

  return transposedPhrase;
}

export default function playPhrase(phraseObj, scaleLetter, bpm) {
  const phrase = transposePhrase(phraseObj, scaleLetter);
  Tone.start();
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.start();
  let synthA = new Tone.Synth().toDestination();
  let delay = Tone.now();

  for (let i = 0; i < phrase.length; i++) {
    let time = phrase[i].time;
    delay += Tone.Time(time).toSeconds();
    synthA.triggerAttackRelease(phrase[i].note, phrase[i].time, delay);
  }
}
