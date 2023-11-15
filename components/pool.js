import { usePoolPhrasesContext } from "./use-poolphrases-context";
import Image from "next/image";

export default function Pool() {
    const [poolPhrases] = usePoolPhrasesContext();
    return (
        <>
            <div>
                {poolPhrases.map((phrase) => (
                    < div
                        key={phrase.note}
                        className="bg-gray-300 rounded-full m-2 px-4 py-1 w-10px h-10px"
                    >
                        {phrase.map(noteandtime => noteandtime.note).toString()}
                        <Image
                            alt="work"
                            key={phrase.note}
                            src="/../public/hammer.png"
                            className="rounded-full m-2"
                            width={20}
                            height={20}
                        />
                        <Image
                            alt="delete"
                            key={phrase.note}
                            src="/../public/trash.png"
                            className="rounded-full m-2"
                            width={20}
                            height={20}
                        />
                        <Image
                            alt="save"
                            key={phrase.note}
                            src="/../public/save.png"
                            className="rounded-full m-2"
                            width={20}
                            height={20}
                        />
                    </div>
                )
                )}
            </div>
        </>
    );
}

/* {poolPhrases.map((phrase) => {
          return (
            <div key="main-div" className="flex flex-row">
              <ul>
              {phrase.map(phrase => (
                  <li key={ phrase.note }>
                  <div key={phrase.note} className='flex flex-column bg-gray-300 p-2 m-1 rounded-full'>
                  {phrase.note}
                  <img className='rounded-full' src='../public/hammer.png'
                  <img className='rounded-full' src='../public/hammer.png'
                  </div>
                  </li>
              )}
          );
              </ul>
            </div>
        })} */
