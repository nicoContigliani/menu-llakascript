import { useState, useCallback } from 'react';

export function useMongoDbConnection() {
  const [isConnected, setIsConnected] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);

  const verifyConnection = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/verify-mongodb');
      const data = await response.json();
      if (response.ok) {
        setIsConnected(true);
      } else {
        setError(data.error);
        setIsConnected(false);
      }
    } catch (err) {
      setError('Failed to verify connection');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isConnected, error, isLoading, verifyConnection };
}