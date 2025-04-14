
function Clicked(gameID){
    console.log("I have been clicked " + gameID)
}

async function endSession(gameID){
    fetch("http://localhost:8080/admin/public/delete-session",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                gameID: gameID
            })
        }
    ).then(response => {
        console.log(response.status);
    })
}

export default function SessionComponent({session}){
    const gameID = session.gameID;
    return(
        <div>
            <div className="grid grid-flow-col ml-3 mt-1 mb-1 mr-3">
                <h1 className="justify-self-start">sessionID: {gameID}</h1>
                <div className="flex justify-end">
                    <button type="button" className="bg-red-600 justify-right pl-0.5 pr-0.5 rounded-md" style={{ cursor: 'pointer' }} onClick={() => endSession(gameID)}>End Session</button>
                </div>
            </div>
        </div>
    )
}