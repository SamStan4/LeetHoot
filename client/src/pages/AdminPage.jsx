import { useState } from "react";
import { useEffect } from "react";
import { getSessions, endSession } from "../utility/api";
import SessionComponent from "../components/admin-components/SessionComponent";

export default function AdminPage(){

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        async function fetchSessions() {
            const session = await getSessions();
            setSessions(session || []);
        }
        fetchSessions();
    }, []);

    async function handler(gameID){
        endSession(gameID);
        const session = await getSessions();
        setSessions(session || []);
    }
    
    return(
        <div className="flex justify-center items-center w-full h-full text-amber-50">
            <div className="w-[60%] h-[70%] min-h-[200px] min-w-[200px] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col items-center justify-center gap-[15px]">
                <div className="w-[80%] h-[80%] align-text-top">
                    <h1 className="justify-left align-text-top">Sessions</h1>
                    <hr className="w-[100%]"/>
                    <div className="h-[87%] overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-600
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        {sessions.map((s, index)=> <SessionComponent key={index} onDelete={handler} session={s}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}