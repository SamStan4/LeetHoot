import { useState } from "react";
import { useEffect } from "react";
import PlayerComponent from "./PlayerComponent";

function Clicked(gameID){
    console.log("I have been clicked " + gameID)
}


/*
curl -X POST http://localhost:8080/admin/public/get-players \
  -H "Content-Type: application/json" \
  -d '{"gameID": 1}'
*/

async function getPlayers(gameID){
    try{
        const res = await fetch("http://localhost:8080/admin/public/get-players",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    gameID: gameID
                })
            }
        )

        if (!res.ok) {
            throw new Error(`HTTP error! Status`);
        }

        const data = await res.json();
        return data.players;
    }
    catch (err){
        console.error(err);
        return null
    }
}

export default function SessionComponent({onDelete, session}){
    const gameID = session.gameID;
    const [gamePlayers, setGamePlayers] = useState([]);

    async function handleClick(gameID) {
        //debugger;
        const players = await getPlayers(gameID);
        setGamePlayers(players);
        console.log(gamePlayers)
    }

    //plays = gamePlayers.map((player, index) => <PlayerComponent key={index} player={player.playerName}/>)

    return(
        <div>
            <div className="grid grid-flow-col ml-3 mt-1 mb-1 mr-3 gap-0 -mx-1">
                <button className="text-xs align-middle w-[34%] mr-0 underline" style={{ cursor: 'pointer' }} onClick={() => handleClick(gameID)}>View Details</button>
                <h1 className="justify-self-start w-[100%]">sessionID: {gameID}</h1>
                <div className="flex justify-end">
                    <button type="button" className="bg-red-600 justify-right pl-0.5 pr-0.5 rounded-md" style={{ cursor: 'pointer' }} onClick={() => onDelete(gameID)}>End Session</button>
                </div>
            </div>
            { 
                gamePlayers.map((player, index) => (
                    <PlayerComponent key={index} player={player} gameID={gameID} />
                ))}
        </div>
    )
}