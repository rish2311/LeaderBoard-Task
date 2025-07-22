import React, { useMemo } from "react";
import Tabs from "./Tabs";
import Countdown from "./Countdown";
import RewardButton from "./RewardButton";
import TopThree from "./TopThree";
import RankList from "./RankList";
import UserDropdown from "./UserDropdown";

import { useLeaderboard } from "../hooks/useLeaderboard";
import type { User } from "../types";

// 10 sample users for demo UI
const sampleUsers = [
  {
    _id: "1",
    name: "John Doe",
    avatarUrl: "https://picsum.photos/200/300",
    rank: 1,
    totalPoints: 1200,
  },
  {
    _id: "2",
    name: "Jane Doe",
    avatarUrl: "https://picsum.photos/200/301",
    rank: 2,
    totalPoints: 1100,
  },
  {
    _id: "3",
    name: "Bob Smith",
    avatarUrl: "https://picsum.photos/200/302",
    rank: 3,
    totalPoints: 1050,
  },
  {
    _id: "4",
    name: "Alice Johnson",
    avatarUrl: "https://picsum.photos/200/303",
    rank: 4,
    totalPoints: 980,
  },
  {
    _id: "5",
    name: "Mike Brown",
    avatarUrl: "https://picsum.photos/200/304",
    rank: 5,
    totalPoints: 950,
  },
  {
    _id: "6",
    name: "Emily Davis",
    avatarUrl: "https://picsum.photos/200/305",
    rank: 6,
    totalPoints: 900,
  },
  {
    _id: "7",
    name: "Tom Harris",
    avatarUrl: "https://picsum.photos/200/306",
    rank: 7,
    totalPoints: 850,
  },
  {
    _id: "8",
    name: "Lily White",
    avatarUrl: "https://picsum.photos/200/307",
    rank: 8,
    totalPoints: 800,
  },
  {
    _id: "9",
    name: "David Lee",
    avatarUrl: "https://picsum.photos/200/308",
    rank: 9,
    totalPoints: 750,
  },
  {
    _id: "10",
    name: "Sophia Kim",
    avatarUrl: "https://picsum.photos/200/309",
    rank: 10,
    totalPoints: 700,
  },
];

const LeaderboardPage: React.FC = () => {
  const { users, isLoading, error, claimPoints } = useLeaderboard();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleClaim = async () => {
    if (selectedUser?._id) {
      try {
        await claimPoints(selectedUser._id);
      } catch (err) {
        console.error("Failed to claim points:", err);
      }
    }
  };

  // Sort users by rank ascending (1,2,3...)
  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.rank - b.rank),
    [users]
  );
  const top3Users = sortedUsers.slice(0, 3);
  const restUsers = sortedUsers.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-50 to-white px-4 sm:px-8 py-4 relative flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Tabs />
        <UserDropdown
          onUserSelect={setSelectedUser}
          selectedUser={selectedUser}
        />

        <div className="mt-2 flex justify-between items-center">
          <Countdown />
          <RewardButton userId={selectedUser?._id} onClaim={handleClaim} />
        </div>
        {isLoading && (
          <div className="text-center py-8 text-lg">Loading leaderboard...</div>
        )}
        {error && <div className="text-center py-8 text-red-500">{error}</div>}
        {!isLoading && !error && (
          <>
            <TopThree users={top3Users} />
            <RankList
              users={
                currentUsers.length > 0 ? currentUsers : sampleUsers.slice(3)
              }
            />

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between px-4">
              <p className="text-sm text-gray-600">
                Showing{" "}
                {Math.min(currentPage * usersPerPage, remainingUsers.length)} of{" "}
                {remainingUsers.length} users
              </p>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
