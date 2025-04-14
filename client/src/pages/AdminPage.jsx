import { useState } from "react";
import { useEffect } from "react";
import SessionComponent from "../components/admin-components/SessionComponent";

async function getSessions(){
    const url = "http://localhost:8080/admin/public/get-sessions"
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        //console.log(json.sessions)
        return json.sessions
      } catch (error) {
        console.error(error.message);
      }
}

//const sessions = [s1, s2]

export default function AdminPage(){
    //const test = getSessions()
    let sessionList = []

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        async function fetchSessions() {
            const sessions = await getSessions(); // wait for the promise
            setSessions(sessions || []); // avoid undefined
            //return sessions.map((s, index)=> <SessionComponent key={index} session={s}/>)
        }

        fetchSessions();
    }, [sessions]);

    const s1 = {
        "gameID": 1
    }
    
    const s2 = {
        "gameID": 2
    }
    const ses = [s1, s2];
    //const sessionList = ses.map((s, index)=> <SessionComponent key={index} session={s}/>)
    sessionList = sessions.map((s, index)=> <SessionComponent key={index} session={s}/>)
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
                        {sessionList}
                    </div>
                </div>
            </div>
        </div>
    )
}