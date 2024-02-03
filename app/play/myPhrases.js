import { useSession } from "next-auth/react";

export default function MyPhrases() {
  let sess = useSession();
  return <p>MyPhrases</p>;
}
