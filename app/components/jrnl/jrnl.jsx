"use client";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import getPhrases from "app/actions/get-phrases";
import deletePhrase from "app/actions/delete-phrase";
import Image from "next/image";
import { useGlobalContext } from "/app/play/useGlobalContext";
import { scalesMasterList } from "utils/random";
import RenameModal from "./renameModal";
import useSession from "utils/supabase/use-session";
import phraseAlreadyInList from "utils/phraseAlreadyInList";
import { initState } from "utils/initState";

export default function Jrnl() {
  const [isLoading, setLoading] = useState(true);
  const [scaleTonality, setScaleTonality] = useState(initState.scaleTonality);
  const [modalOpen, setModalOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [selectedPhrase, setSelectedPhrase] = useState({});
  const [searchPhrase, setSearchPhrase] = useState("");

  const {
    poolPhrases,
    setPoolPhrases,
    workingPhrases,
    setWorkingPhrases,
    jrnlPhrasesUpdateCounter,
    setJrnlPhrasesUpdateCounter,
    jrnlPhrases,
    setJrnlPhrases,
  } = useGlobalContext();
  const session = useSession();

  function handleTonalitySelection(e) {
    setScaleTonality(e.target.value);
  }

  function handleSearch(e) {
    setSearchPhrase(e.target.value);
  }

  function handleRename(phraseObj) {
    setRenameValue(phraseObj.name);
    setSelectedPhrase(phraseObj);
    setModalOpen(true);
  }

  async function handleDelete(phraseObj) {
    const phraseId = phraseObj.phrase_id;
    await deletePhrase(phraseId);
    setJrnlPhrasesUpdateCounter(jrnlPhrasesUpdateCounter + 1);
  }

  function handleLoad(phraseObj) {
    if (phraseAlreadyInList(phraseObj, poolPhrases)) {
      window.alert("Phrase is already in your list.");
      return;
    }
    setPoolPhrases((prev) => [...prev, phraseObj]);
  }

  useEffect(() => {
    getPhrases()
      .then((data) => {
        setJrnlPhrases(data);
      })
      .catch((error) => {
        console.error("Error fetching phrases:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [jrnlPhrasesUpdateCounter]);

  if (!session) {
    return <p>Login to save phrases.</p>;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex p-3 justify-around items-center">
          <TextField id="outlined-basic" label="Search Your Phrases" variant="outlined" value={searchPhrase} onChange={e => handleSearch(e)}/>
          <FormControl>
            <InputLabel id="jrnl-tonality-selector">Tonality</InputLabel>
            <Select
              labelId="jrnl-tonality-selector"
              variant="outlined"
              id="jrnl-tonality-selector"
              value={scaleTonality}
              label="Tonality"
              onChange={(e) => handleTonalitySelection(e)}
            >
              {scalesMasterList.map((scale) => {
                return <MenuItem value={scale}>{scale}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: 400,
          }}
        >
          <List>
            {jrnlPhrases
              .filter(phraseObj => phraseObj.tonality === scaleTonality)
              .filter(phraseObj => phraseObj.name.toLowerCase().includes(searchPhrase.toLowerCase()))
              .map((phraseObj) => (
                <ListItem key={phraseObj.phrase_id}>
                  <ListItemText>{phraseObj.name}</ListItemText>
                  <ListItemIcon>
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
        <RenameModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          renameValue={renameValue}
          setRenameValue={setRenameValue}
          selectedPhrase={selectedPhrase}
          setJrnlPhrasesUpdateCounter={setJrnlPhrasesUpdateCounter}
          jrnlPhrases={jrnlPhrases}
          setJrnlPhrases={setJrnlPhrases}
          workingPhrases={workingPhrases}
          setWorkingPhrases={setWorkingPhrases}
          setPoolPhrases={setPoolPhrases}
          poolPhrases={poolPhrases}
        />
      </div>
    </>
  );
}
