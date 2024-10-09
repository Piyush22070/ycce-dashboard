"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import DashBoard from "./DashBoard";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";


export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>

        {/* Signed in Name is {session.user?.name} <br />
        Signed in email is {session.user?.email} <br />
        {session.user?.image && <img src={session.user.image} alt="profile image" />}
        <button onClick={() => signOut()}>Sign out</button> */}

        <div className="flex flex-row">
            <div className="w-1/5">
                <SideBar/>
            </div>
            <div className="w-4/5" >
                <Header session = {session}/>
                <DashBoard/>
            </div>
        </div>
        <Footer/>
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
