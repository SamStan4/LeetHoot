
function Clicked(){
    console.log("I have been clicked")
}

export default function SessionComponent({session}){
    const gameID = session.gameID;
    return(
        <div>
            <div className="grid grid-flow-col ml-3 mt-1 mb-1 mr-3">
                <h1 className="justify-self-start">sessionID: {gameID}</h1>
                <div className="flex justify-end">
                    <button type="button" className="bg-red-600 justify-right pl-0.5 pr-0.5 rounded-md" style={{ cursor: 'pointer' }} onClick={Clicked}>End Session</button>
                </div>
            </div>
        </div>
    )
}