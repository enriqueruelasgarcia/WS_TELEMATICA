import { useEffect, useState } from "react";
import {supabase} from "./supabaseClient"
import Auth from "./Auth";
import Dashboard from "./components_icons/dashboard";

export function SignOut(){
  return(
    <>
    <button onClick={()=>{supabase.auth.signOut()}}>Cerrar sesion</button>
    </>
  )
}
function App() {
const [session, setSession]=useState(null);
useEffect(()=>{
  supabase.auth.getSession().then(({data:{session}})=>{
    setSession(session);
  })
  supabase.auth.onAuthStateChange((_event,session)=>{
    setSession(session);
  })
})
  return (
    
    <>
        {!session ? <Auth/>:<Dashboard email={session.user.email}></Dashboard>}
    </>
  );
}

export default App
