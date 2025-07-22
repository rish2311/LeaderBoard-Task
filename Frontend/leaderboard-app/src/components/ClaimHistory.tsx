import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaStar } from 'react-icons/fa';

interface ClaimHistoryProps {
  userId: string | null;
}

interface HistoryItem {
  claimedPoints: number;
  timestamp: string;
}

const ClaimHistory: React.FC<ClaimHistoryProps> = ({ userId }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setHistory([]);
      return;
    }

    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/history/${userId}`);
        setHistory(response.data);
      } catch (err) {
        setError('Failed to load claim history.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  const renderContent = () => {
    if (!userId) {
      return (
        <div className="p-4 text-center">
          <p className="text-gray-500">Select a user to see their claim history.</p>
        </div>
      );
    }
    
    if (isLoading) {
      return <div className="p-4 text-center">Loading history...</div>;
    }
    
    if (error) {
      return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (history.length === 0) {
      return <div className="p-4 text-center text-gray-500">No claims yet for this user.</div>;
    }

    return (
      <ul className="space-y-3">
        {history.map((item, index) => (
          <li key={index} className="flex items-center text-sm">
            <FaStar className="text-yellow-500 mr-3 flex-shrink-0" />
            <span>
              Claimed <strong>{item.claimedPoints}</strong> points on{' '}
              {new Date(item.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Claim History</h2>
      {renderContent()}
    </div>
  );
};

export default ClaimHistory; 