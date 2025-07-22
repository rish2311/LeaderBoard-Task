import React from 'react';
import { FaGift } from 'react-icons/fa';

interface RewardButtonProps {
  userId?: string;
  onClaim?: () => void;
}

const RewardButton: React.FC<RewardButtonProps> = ({ userId, onClaim }) => {
  const handleClick = () => {
    if (userId && onClaim) {
      onClaim();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!userId}
      className={`flex items-center gap-2 font-bold py-2 px-4 rounded-full shadow-xl transition duration-300 ease-in-out text-sm ${
        userId 
          ? 'bg-pink-400 hover:bg-pink-500 text-white hover:scale-110' 
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
      style={{ minWidth: 90 }}
      title={userId ? "Claim Rewards" : "Select a user first"}
    >
      <FaGift className="text-lg text-shadow" />
      <span className="text-shadow">Rewards</span>
    </button>
  );
};

export default RewardButton;