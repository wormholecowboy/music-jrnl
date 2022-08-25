import Generator from '../components/generator';

export default function playIndex() {
  return (
    <div
      id="main-play"
      className="h-screen grid grid-cols-2 grid-rows-4 gap-5 mx-20"
    >
      <div
        id="working"
        className="col-span-full row-start-1 row-end-2 bg-red-400"
      >
        Working Area
      </div>
      <div id="generator" className="row-start-2 row-end-4 bg-blue-400">
        Generator
        <Generator />
      </div>

      <div id="my-vocab" className="row-start-2 row-end-4 bg-green-400">
        myVocab
      </div>
    </div>
  );
}
