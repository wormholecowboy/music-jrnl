import { v4 as uuidv4 } from 'uuid';
import { usePoolPhrasesContext } from './use-poolphrases-context';

export default function Pool() {
  const [poolPhrases] = usePoolPhrasesContext();
  return (
    <>
      <div>
        <p>This is the pool</p>
        {poolPhrases.map((phrase) => {
          return (
            <div key={uuidv4()} className="flex flex-row">
              <li key={uuidv4()}>
                {phrase.map((noteandtime) => (
                  <span key={uuidv4()}>{noteandtime.note}</span>
                ))}
              </li>
              <button className="bg-gray-300 p-2 m-1 rounded-lg">Delete</button>
              <button className="bg-gray-300 p-2 m-1 rounded-lg">Save</button>
              <button className="bg-gray-300 p-2 m-1 rounded-lg">
                Work It!
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
