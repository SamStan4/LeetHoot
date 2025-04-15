import { useEffect, useState } from "react";

export default function AdminViewPage() {
  const [gameSessions, setGameSessions] = useState([]);

  useEffect(() => {
    // load the game sessions
  }, []);

  const handleDeleteGame = async () => {
    // delete game
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col justify-center">

      </div>
    </div>
  ) ;
}