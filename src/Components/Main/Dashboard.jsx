import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleTransfer = () => {
    navigate("/transfer");
  };

  const handleVote = () => {
    navigate("/vote");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg "
        onClick={handleTransfer}
      >
        Token Transfer
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg "
        onClick={handleVote}
      >
        Voting
      </button>
    </div>
  );
};

export default Dashboard;
