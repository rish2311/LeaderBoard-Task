import React from "react";
import type { User } from "../types";

// 10 sample users for demo UI
const sampleUsers: User[] = [
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

interface RankListProps {
  users: User[];
}

const AVATAR_CARD_SIZE = "48px";
const AVATAR_CARD_HEIGHT = "48px";

const RankList: React.FC<RankListProps> = ({ users }) => {
  const displayUsers = users && users.length > 0 ? users : sampleUsers;
  return (
    <div className="mt-4 flex flex-col gap-2 overflow-hidden">
      {displayUsers.map((user) => (
        <div
          key={user._id}
          className="flex flex-row items-center gap-4 py-2 px-4 bg-blue-400 rounded-md shadow-sm border-b hover:bg-yellow-50 transition duration-300"
        >
          {/* Rank */}
          <span className="w-8 text-center text-lg font-bold text-gray-600 text-shadow flex-shrink-0">
            {user.rank}
          </span>
          {/* Avatar Card */}
          <div
            className="flex items-center justify-center rounded-lg overflow-hidden bg-gray-100 border border-gray-300 shadow-md flex-shrink-0"
            style={{ width: AVATAR_CARD_SIZE, height: AVATAR_CARD_HEIGHT }}
          >
            <img
              src={
                user.avatarUrl ||
                user.avatar ||
                "https://via.placeholder.com/300"
              }
              alt={user.name}
              className="object-cover w-full h-full"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          {/* Name */}
          <div className="flex-1 min-w-0 font-medium text-shadow truncate max-w-[140px]">
            {user.name}
          </div>
          {/* Points */}
          <div className="flex items-center gap-1 text-yellow-500 font-semibold text-shadow flex-shrink-0">
            {user.totalPoints ? user.totalPoints.toLocaleString() : ""}{" "}
            <span className="ml-1">🏆</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RankList;
