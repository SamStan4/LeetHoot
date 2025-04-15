import { useState } from "react";
import GameSessionViewModal from "@components/GameSessionViewModal";

export default function GameSessionViewComponent({ gameID, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const handleViewGameDetails = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="w-[90%] flex items-center justify-between px-6 py-4 bg-[#2A2D2E] border border-[#87898A] rounded-2xl mb-4 shadow-md">
        <div className="text-white text-lg font-medium">
          Game ID: <span className="text-blue-400">{gameID}</span>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
          onClick={handleViewGameDetails}
        >
          View Details
        </button>
      </div>
      {showModal && (
        <GameSessionViewModal
          gameID={gameID}
          onDelete={() => {
            onDelete();
            handleCloseModal();
          }}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}