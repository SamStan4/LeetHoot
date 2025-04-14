
async function kickPlayer(playerName){
    fetch("http://localhost:8080/admin/public/delete-session",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playerName: playerName
            })
        }
    ).then(response => {
        console.log(response.status);
    })
}

export default function PlayerComponent(player){
    const playerName = player.playerName;

    return(
        <div>
            <div className="grid grid-flow-col ml-3 mt-1 mb-1 mr-3 gap-0 -mx-1">
                <h1 className="justify-self-start w-[100%]">Name: {playerName}</h1>
                <div className="flex justify-end">
                    <button type="button" className="bg-red-600 justify-right pl-0.5 pr-0.5 rounded-md" style={{ cursor: 'pointer' }} onClick={() => kickPlayer(playerName)}>Kick</button>
                </div>
            </div>
        </div>
    )
}