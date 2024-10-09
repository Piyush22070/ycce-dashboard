"use client";
import { useSession, signIn, signOut } from "next-auth/react";

// Define the types for the session object
export default function Component() {
  const { data: session } = useSession();

  // If the session exists, display the user's details and sign-out button
  if (session) {
    return (
      <>
        Signed in Name is {session.user?.name} <br />
        Signed in email is {session.user?.email} <br />
        {session.user?.image && <img src={session.user.image} alt="profile image" />}

        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  // If the session does not exist, display the sign-in button
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </>
  );
}
