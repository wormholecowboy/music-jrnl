"use client";
import {
  Box,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";
import getPhrases from "../actions/get-phrases";
import deletePhrase from "../actions/delete-phrase";
import Image from "next/image";
import { usePoolPhrasesContext } from "/app/play/use-poolphrases-context";
import { scalesMasterList } from "../../utils/random";
import RenameModal from "../components/jrnl/rename-modal";

export default function Jrnl() {
  const [phrases, setPhrases] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [scaleTonality, setScaleTonality] = useState("Blues");
  const [modalOpen, setModalOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const {
    poolPhrases,
    setPoolPhrases,
    updateJrnlPhrases,
    setUpdateJrnlPhrases,
  } = usePoolPhrasesContext();
  console.log("poolphr: ", poolPhrases);

  function handleTonalitySelection(e) {
    setScaleTonality(e.target.value);
  }

  function handleRename(phraseObj) {
    setRenameValue(phraseObj.name)
    setModalOpen(true)
  }

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
        <div className="flex p-3 justify-around items-center">
          <p>
            <strong>Your Phrase Journal</strong>
          </p>
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
          <select></select>
        </div>
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: 450,
          }}
        >
          <List>
            {phrases
              .filter((phraseObj) => phraseObj.tonality === scaleTonality)
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
        <RenameModal modalOpen={modalOpen} setModalOpen={setModalOpen} renameValue={renameValue} setRenameValue={setRenameValue}/>
      </div>
    </>
  );
}
