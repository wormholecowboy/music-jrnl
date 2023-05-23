export default function Pool() {
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
