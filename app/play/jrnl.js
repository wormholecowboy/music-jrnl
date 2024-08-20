"use client";
import {
  Box,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState, useEffect } from "react";
import getPhrases from "../actions/get-phrases";
import deletePhrase from "../actions/delete-phrase";
import Image from "next/image";
import { usePoolPhrasesContext } from "/app/play/use-poolphrases-context";

export default function Jrnl() {
  const [selected, setSelected] = useState();
  const [phrases, setPhrases] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const {
    poolPhrases,
    setPoolPhrases,
    updateJrnlPhrases,
    setUpdateJrnlPhrases,
  } = usePoolPhrasesContext();
  console.log("poolphr: ", poolPhrases);

  async function handleDelete(phraseObj) {
    const phraseId = phraseObj.phrase_id;
    // TODO: remove snake case from clientside
    console.log("phrase obj jrnl: ", phraseObj);
    await deletePhrase(phraseId);
    setUpdateJrnlPhrases(updateJrnlPhrases + 1);
  }

  function handleLoad(phraseObj) {
    console.log("phraseobj: ", phraseObj);
    setPoolPhrases((prev) => [...prev, phraseObj]);
  }

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
  }, [updateJrnlPhrases]);

  return (
    <>
      <div className="flex flex-col">
        <p>
          <strong>Your Phrase Journal</strong>
        </p>
        <Box
          sx={{
            overflowY: 'auto',
            maxHeight: 450
          }}
        >
          <List>
            {phrases.map((phraseObj) => (
              <ListItem key={phraseObj.phrase_id}>
                <ListItemText>{phraseObj.name}</ListItemText>
                <ListItemIcon>
                  <span
                    onClick={() => handleRename(phraseObj)}
                    className="ml-4 cursor-pointer"
                  >
                    <Image
                      src="/rename.png"
                      width={20}
                      height={20}
                      alt="rename"
                    />
                  </span>
                  <span
                    onClick={() => handleLoad(phraseObj)}
                    className="ml-4 cursor-pointer"
                  >
                    <Image
                      src="/larrow.png"
                      width={20}
                      height={20}
                      alt="load"
                    />
                  </span>
                  <span
                    onClick={() => handleDelete(phraseObj)}
                    className="ml-4 cursor-pointer"
                  >
                    <Image
                      src="/trash.png"
                      width={20}
                      height={20}
                      alt="delete"
                    />
                  </span>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    </>
  );
}
