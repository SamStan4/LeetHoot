import { useState } from "react";
import { useEffect } from "react";
import SessionComponent from "../components/admin-components/SessionComponent";
//import { response } from "express";


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



const s1 = {
    "gameID": 1
}

const s2 = {
    "gameID": 2
}

const sessions = [s1, s2]

export default function AdminPage(){
    //const test = getSessions()
    //const test = await fetch("http://localhost:8080/admin/public/get-sessions").then(response => response.json()).catch(error => console.error('Error:', error))
    const test = getSessions()
    console.log(test)

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        async function fetchSessions() {
            const data = await getSessions(); // wait for the promise
            setSessions(data || []); // avoid undefined
        }

        fetchSessions();
    }, []);

    const s1 = {
        "gameID": 1
    }
    
    const s2 = {
        "gameID": 2
    }
    const ses = [s1, s2];
    //const sessionList = ses.map((s, index)=> <SessionComponent key={index} session={s}/>)
    const sessionList = sessions.map((s, index)=> <SessionComponent key={index} session={s}/>)
    return(
        <div className="flex justify-center items-center w-full h-full text-amber-50">
            <div className="w-[60%] h-[70%] min-h-[200px] min-w-[200px] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col items-center justify-center gap-[15px]">
                <div className="w-[80%] h-[80%] align-text-top">
                    <h1 className="justify-left align-text-top">Sessions</h1>
                    <hr className="w-[100%]"/>
                    <div className="h-100 overflow-y-auto">
                        {sessionList}
                    </div>
                </div>
            </div>
        </div>
    )
}