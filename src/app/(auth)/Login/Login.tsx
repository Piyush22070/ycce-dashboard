"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import DashBoard from "../../../components/derived/DashBoard";
import Header from "../../../components/derived/Header";
import Footer from "../../../components/derived/Footer";
import Sidebar from "../../../components/derived/SideBar";
export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>

        {/* Signed in Name is {session.user?.name} <br />
        Signed in email is {session.user?.email} <br />
        {session.user?.image && <img src={session.user.image} alt="profile image" />}
        <button onClick={() => signOut()}>Sign out</button> */}
        <Header session={session}/>
        <DashBoard/>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </>
  );
}
