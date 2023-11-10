import { v4 as uuidv4 } from "uuid";
import { usePoolPhrasesContext } from "./use-poolphrases-context";
import Image from "next/image";

export default function Pool() {
  const [poolPhrases] = usePoolPhrasesContext();
  return (
    <>
      <div>
        <p>This is the pool</p>
        <ul>
          {poolPhrases.map((noteandtime) => (
            <li key={noteandtime.note}>
              <div
                key={noteandtime.note}
                className="bg-gray-300 rounded-full m-2 p-1"
              >
                {noteandtime.note}
                <Image
                  alt="work"
                  key={noteandtime.note}
                  src="/../public/hammer.png"
                  className="rounded-full m-2"
                  width={50}
                  height={30}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* {poolPhrases.map((phrase) => {
          return (
            <div key="main-div" className="flex flex-row">
              <ul>
              {phrase.map(noteandtime => (
                  <li key={ noteandtime.note }>
                  <div key={noteandtime.note} className='flex flex-column bg-gray-300 p-2 m-1 rounded-full'>
                  {noteandtime.note}
                  <img className='rounded-full' src='../public/hammer.png'
                  <img className='rounded-full' src='../public/hammer.png'
                  </div>
                  </li>
              )}
          );
              </ul>
            </div>
        })} */
