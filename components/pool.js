import { usePoolPhrasesContext } from './use-poolphrases-context';

export default function Pool() {
  const { poolPhrases } = usePoolPhrasesContext();
  return (
    <>
      <div className="bg-purple-300">
        <p>This is the pool</p>
        {poolPhrases.map((phrase) => {
          <span>{phrase.note}</span>;
        })}
      </div>
    </>
  );
}
