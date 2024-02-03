import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Avatar() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.name}
      <Image src={session.user.image} width={50} height={50} alt="user icon"></Image>
        <button
          className="self-center mx-4 px-4 py-2 text-color4 border-2 border-color4 shadow-lg rounded-lg bg-color5"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button
        className="self-center mx-4 px-4 py-2 text-color4 border-2 border-color4 shadow-lg rounded-lg bg-color5"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
