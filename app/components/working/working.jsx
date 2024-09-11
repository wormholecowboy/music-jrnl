"use client";
import Image from "next/image";
import playPhrase from "utils/playPhrase";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggablePhrase from "./draggablePhrase";
import { useGlobalContext } from "../../play/useGlobalContext";
import { useState } from "react";
import { phraseToString } from "utils/random";

export default function WorkingArea() {
  const { bpm, workingPhrases, setWorkingPhrases, scaleLetter } =
    useGlobalContext();
  const [rest, setRest] = useState("4n");

  function removeRest(idx) {
    const newWorkingPhrases = [...workingPhrases];
    newWorkingPhrases[idx].phrase.pop();
    setWorkingPhrases(newWorkingPhrases);
  }

  function handlePlayClick(phrases) {
    if (phrases.length < 1) {
      window.alert("Add some phrases to the working area first.");
      return;
    }

    const phrase = [];
    phrases.map((phraseObj) => {
      phraseObj.phrase.map((noteandtime) => phrase.push(noteandtime));
    });
    const obj = { phrase: phrase };
    playPhrase(obj, scaleLetter, bpm);
  }

  function addRest(idx, time) {
    const rest = { note: null, time: time };
    const newWorkingPhrases = [...workingPhrases];
    newWorkingPhrases[idx].phrase.push(rest);

    setWorkingPhrases(newWorkingPhrases);
  }

  function deletePhrase(id) {
    setWorkingPhrases((prev) => {
      const updatedPhrases = prev.filter(
        (phraseObj) => phraseObj.phrase_id !== id,
      );
      return updatedPhrases;
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setWorkingPhrases((phrases) => {
        const activeIndex = phrases.findIndex((p) => p.phrase_id === active.id);
        const overIndex = phrases.findIndex((p) => p.phrase_id === over.id);

        return arrayMove([...phrases], activeIndex, overIndex);
      });
    }
  }

  return (
    <div className="flex flex-col justify-center justify-items-center">
      <div className="p-3 flex flex-row self-center">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={workingPhrases.map((phraseObj) => phraseObj.phrase_id)}
            strategy={horizontalListSortingStrategy}
          >
            {workingPhrases.map((phraseObj, idx) => (
              <>
                <span title={phraseToString(phraseObj.phrase)}>
                  <DraggablePhrase
                    id={phraseObj.phrase_id}
                    key={phraseObj.phrase_id}
                    color={`${phraseObj.color}`}
                  >
                    <div id="pillParent">
                      <div className="flex flex-row m-0 p-0 items-center">
                        {phraseObj.name}
                        <span
                          className="m-1 cursor-pointer"
                          onClick={() => removeRest(idx)}
                        >
                          <Image
                            alt="minus"
                            src="/minus.png"
                            className="rounded-full m-2"
                            width={20}
                            height={20}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                            }}
                          />
                        </span>
                        <span
                          className="m-1 cursor-pointer"
                          onClick={() => addRest(idx, rest)}
                        >
                          <Image
                            alt="rest"
                            src="/rest.png"
                            className="rounded-full m-2"
                            width={20}
                            height={20}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                            }}
                          />
                        </span>
                        <span
                          className="m-1 cursor-pointer"
                          onClick={() => deletePhrase(phraseObj.phrase_id)}
                        >
                          <Image
                            alt="delete"
                            src="/trash.png"
                            className="rounded-full m-2"
                            width={20}
                            height={20}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                            }}
                          />
                        </span>
                      </div>
                      <div className="ml-7 p-0" id="notesInPhrase">
                        {phraseToString(phraseObj.phrase)}
                      </div>
                    </div> {/* pillParent */}
                  </DraggablePhrase>
                </span>
              </>
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className="flex flex-row justify-center">
        <FormControl>
          <InputLabel id="rest-selector">Add Rest</InputLabel>
          <Select
            labelId="Rest"
            variant="outlined"
            id="Rest"
            value={rest}
            label="Add Rest"
            onChange={(e) => setRest(e.target.value)}
            sx={{ width: 100 }}
          >
            <MenuItem value="2n">2n</MenuItem>
            <MenuItem value="4n">4n</MenuItem>
            <MenuItem value="8n">8n</MenuItem>
            <MenuItem value="16n">16n</MenuItem>
            <MenuItem value="4n.">4n.</MenuItem>
            <MenuItem value="2n.">2n.</MenuItem>
            <MenuItem value="8n.">8n.</MenuItem>
            <MenuItem value="16n.">16n.</MenuItem>
          </Select>
        </FormControl>
        <button
          onClick={() => handlePlayClick(workingPhrases)}
          className="self-center px-4 py-2 mx-4 text-color4 shadow-md rounded-md bg-color5 border-2 border-color4"
        >
          Play
        </button>
      </div>
    </div>
  );
}
