import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import type { User, ClaimResponse } from '../types';

export const useLeaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<User[]>('/users');
      setUsers(currentUsers => {
        if (JSON.stringify(currentUsers) !== JSON.stringify(response.data)) {
          return response.data;
        }
        return currentUsers;
      });
    } catch (err) {
      setError('Failed to fetch leaderboard.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  const claimPoints = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<ClaimResponse>('/claim', { userId });
      setUsers(response.data.leaderboard);
      return response.data;
    } catch (err) {
      setError('Failed to claim points.');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (name: string, avatarUrl: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post('/users', { name, avatarUrl });
      await fetchLeaderboard();
    } catch (err) {
      setError('Failed to create user.');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { users, isLoading, error, claimPoints, createUser };
}; 