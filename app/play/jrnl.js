"use client";
import {
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState, useEffect } from "react";
import getPhrases from "../actions/get-phrases";
import Image from "next/image";

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
      <div className="flex flex-col">
        <p>
          <strong>Your Phrase Journal</strong>
        </p>
        <div></div>
        <List>
          {phrases.map((phraseObj) => (
            <ListItem key={phraseObj.phrase_id}>
              <ListItemText>{phraseObj.name}</ListItemText>
              <ListItemIcon>
                <span>
                  <Image src="/rename.png" width={20} height={20} />
                </span>
                <span>
                  <Image src="/larrow.png" width={20} height={20} />
                </span>
                <span>
                  <Image src="/trash.png" width={20} height={20} />
                </span>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
