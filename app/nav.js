import Link from "next/link";
import LoginButton from "./components/login-button";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center text-gray-700 uppercase font-bold h-14 mb-5 bg-orange-300">
      <ul className="flex justify-between items-start list-none">
        <li className="ml-10">
          <Link href="/">Home</Link>
        </li>
        <li className="ml-10">
          <Link href="/why">Why</Link>
        </li>
        <li className="ml-10">
          <Link href="/how">How</Link>
        </li>
        <li className="ml-10">
          <Link href="/play">Play</Link>
        </li>
      </ul>
      <LoginButton />
      <h1 className="text-center text-xl p-3">Music Vocabulary Journal</h1>
    </nav>
  );
}
