export default function PlayerComponent({player, gameID, onDelete}){

    return(
        <div>
            <div className="grid grid-flow-col ml-3 mt-1 mb-1 mr-3 gap-0 -mx-1">
                <h1 className="justify-self-center w-[100%] text-xs align-middle">Name: {player.playerName}</h1>
                <div className="flex justify-end">
                    <button type="button" className="bg-red-600 justify-right pl-0.5 pr-0.5 rounded-md w-[22%]" style={{ cursor: 'pointer' }} onClick={() => onDelete(player.playerName, gameID)}>Kick</button>
                </div>
            </div>
        </div>
    )
}