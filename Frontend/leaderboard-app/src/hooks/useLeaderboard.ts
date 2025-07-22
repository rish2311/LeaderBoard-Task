import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import type { User, ClaimResponse, LeaderboardResponse } from '../types';

export const useLeaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Fetch all users for dropdown
  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await api.get<User[]>('/users');
      setAllUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch all users:', err);
    }
  }, []);

  // Fetch leaderboard with pagination
  const fetchLeaderboard = useCallback(async (page: number = 1, limit: number = 10) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<LeaderboardResponse>(`/leaderboard?page=${page}&limit=${limit}`);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (err) {
      setError('Failed to fetch leaderboard.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Claim points for a user
  const claimPoints = async (userId: string): Promise<ClaimResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<ClaimResponse>(`/claim/${userId}`);
      
      // Refresh both leaderboard and all users
      await Promise.all([
        fetchLeaderboard(pagination.currentPage),
        fetchAllUsers()
      ]);
      
      return response.data;
    } catch (err) {
      setError('Failed to claim points.');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Create new user
  const createUser = async (name: string, avatar: string = ''): Promise<User> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<User>('/users', { name, avatar });
      
      // Refresh both leaderboard and all users
      await Promise.all([
        fetchLeaderboard(pagination.currentPage),
        fetchAllUsers()
      ]);
      
      return response.data;
    } catch (err) {
      setError('Failed to create user.');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLeaderboard();
    fetchAllUsers();
  }, [fetchLeaderboard, fetchAllUsers]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeaderboard(pagination.currentPage);
      fetchAllUsers();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchLeaderboard, fetchAllUsers, pagination.currentPage]);

  return {
    users,
    allUsers,
    isLoading,
    error,
    pagination,
    claimPoints,
    createUser,
    fetchLeaderboard
  };
};