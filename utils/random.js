import { colors } from "../styles/colors.js";

let currentNote = 0;
let previousNote = 0;

export function phraseToString(phrase) {
  return phrase.map((noteandtime) => noteandtime.note).toString();
  // phraseObj.phrase.map((noteandtime) => {
  //                     if (noteandtime.note === null)
  //                       return `_${noteandtime.time.toString()}`;
  //                     return noteandtime.note.toString();
  //                   })
}

export function randomColor() {
  const idx = randomIndex(0, colors.length - 1);
  return colors[idx];
}

export function randomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let index = Math.floor(Math.random() * (max - min) + min);
  return index;
}

export function randomIndexNoRepeat(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  previousNote = currentNote;
  while (currentNote == previousNote) {
    currentNote = Math.floor(Math.random() * (max - min) + min);
  }
  return currentNote;
}
