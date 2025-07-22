export interface User {
  _id: string;
  name: string;
  totalPoints: number;

export interface ClaimResponse {
  user: User;
  claimedPoints: number;
  leaderboard: User[];
} 