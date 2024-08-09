"use client";
import { List, ListItem, ListItemButton } from "@mui/material";
import { useState, useEffect } from "react";
import getPhrases from "../actions/get-phrases";

export default function Jrnl() {
  const [selected, setSelected] = useState();
  const [phrases, setPhrases] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPhrases()
      .then((data) => {
        setPhrases(data);
        console.log("data from jrnl comp: ", data);
      })
      .catch((error) => {
        console.error("Error fetching phrases:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex flex-row justify-center my-3 gap-2">
        <button className="self-center px-4 py-2 text-color4 border-2 border-color4 shadow-lg rounded-lg bg-color5">
          Load
        </button>
        <button className="self-center px-4 py-2 text-color4 border-2 border-color4 shadow-lg rounded-lg bg-color5">
          Delete
        </button>
        <button className="self-center px-4 py-2 text-color4 border-2 border-color4 shadow-lg rounded-lg bg-color5">
          Rename
        </button>
      </div>
      <List>
        {phrases.map((phraseObj) => (
          <ListItemButton key={phraseObj.phrase_id}>
            {phraseObj.name}
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
