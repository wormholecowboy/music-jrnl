import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="flex justify-between items-center text-gray-700 uppercase font-bold h-14 mb-5 bg-gray-400">
      <ul className="flex justify-between items-start">
        <li className="ml-10">
          <Link href="/">Home</Link>
        </li>
        <li className="ml-10">
          <Link href="/">Why</Link>
        </li>
        <li className="ml-10">
          <Link href="/">How</Link>
        </li>
        <li className="ml-10">
          <Link href="/play/play">Play</Link>
        </li>
      </ul>
      <h1 className="text-center text-xl p-3">Music Vocabulary Journal</h1>
    </nav>
  );
}
