import { useState } from "react";
import PlayerComponent from "./PlayerComponent";
import { deleteAPlayer, getPlayers } from "../../utility/api.js";

export default function SessionComponent({onDelete, session}){
    const gameID = session.gameID;
    const [gamePlayers, setGamePlayers] = useState([]);

    async function handleClick(gameID) {
        const players = await getPlayers(gameID);
        setGamePlayers(players);
        console.log(gamePlayers)
    }

    async function handler(playerName, gameID){
        deleteAPlayer(playerName, gameID)
        const players = await getPlayers(gameID);
        setGamePlayers(players || []);
    }

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
                    <PlayerComponent key={index} onDelete={handler} player={player} gameID={gameID} />
                ))}
        </div>
    )
}