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
import { initState } from "utils/initState";

export default function WorkingArea() {
  const { bpm, workingPhrases, setWorkingPhrases, scaleLetter } =
    useGlobalContext();
  const [rest, setRest] = useState(initState.addRest);
  const availableRests = ["2n", "4n", "8n", "16n", "2n.", "4n.", "8n.", "16n."];

  function handleRemoveEndNote(idx) {
    const newWorkingPhrases = [...workingPhrases];
    newWorkingPhrases[idx].phrase.pop();
    setWorkingPhrases(newWorkingPhrases);
  }

  function handlePlay(phrases) {
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

  function handleAddRest(idx, time) {
    const rest = { note: null, time: time };
    const newWorkingPhrases = [...workingPhrases];
    newWorkingPhrases[idx].phrase.push(rest);

    setWorkingPhrases(newWorkingPhrases);
  }

  function handleDelete(id) {
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
      <div className="flex flex-row justify-center mt-5">
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
            {availableRests.map((rest) => {
              return <MenuItem value={rest}>{rest}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <button
          onClick={() => handlePlay(workingPhrases)}
          className="self-center px-4 py-2 mx-4 text-color4 shadow-md rounded-md bg-color5 border-2 border-color4"
        >
          Play
        </button>
      </div>
      <div className="p-3 flex flex-row self-center drop-shadow-xl">
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
                      <div className="flex m-0 p-0 items-center">
                        {phraseObj.name}
                        <div id="iconsParent" className="flex ml-auto">
                          <span
                            className="m-1 cursor-pointer"
                            onClick={() => handleRemoveEndNote(idx)}
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
                            onClick={() => handleAddRest(idx, rest)}
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
                            onClick={() => handleDelete(phraseObj.phrase_id)}
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
                      </div>
                      <div className="ml-7 p-0" id="notesInPhrase">
                        {phraseToString(phraseObj.phrase)}
                      </div>
                    </div>{" "}
                    {/* pillParent */}
                  </DraggablePhrase>
                </span>
              </>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
