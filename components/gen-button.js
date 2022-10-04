export default function GenerateButton() {
  function startTransport() {
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
  }

  function run() {
    console.log('Start');
    Tone.start();
    startTransport();
    oneShot();
  }

  function handleChange() {
    startTransport();
    run();
  }

  return (
    <button
      onChange={() => handleChange}
      className="self-center px-4 py-2 text-green-500 shadow-md rounded-md bg-slate-700"
    >
      Generate
    </button>
  );
}
