import { SignOut } from "../App"
import { useSessionContext } from "../hooks/useSession"
import { useState } from "react"
import Table from "./Table"
import Forecasting from "./Forecasting"

export default function Dashboard({children,email}){
    const [section,setSection]=useState("Dashboard")
    const {session}=useSessionContext();
    return(
     <>
     <div className="bg-slate-900 w-full text-white px-4">
        <div className="flex justify-between">
            <div className="inline-flex items-center space-x-3">
                <h3 className="text-2xl font-bold ">
                    Telematica WS
                </h3>
                    <p onClick={()=>setSection("Dashboard")} className="text-white cursor-pointer">Dashboard</p>
                    <p onClick={()=>setSection("Forecasting")} className="text-white cursor-pointer">Forecasting</p>
        
            </div>
            <div className="py-4 inline-flex items-center">
                <p className="p-4 font-bold">{email}</p>
             <p className="p-4 rounded-lg px-4 py-2 bg-slate-100 font-bold text-black">
                <SignOut></SignOut>
             </p>
            </div>
        </div>
     </div>
     <div className="w-full">
        <div className="px-5 py-4 border-b border-black">
            <h1 className="text-4xl font-bold ">
                {section}
            </h1>
        </div>
     </div>
     <div className="px-5 py-8">
        {section == "Dashboard" && <Table/>}
        {section=="Forecasting" && <Forecasting/>}
     </div>
     </>
    )
}