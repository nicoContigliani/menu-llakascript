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
      console.log("🚀 ~ verifyConnection ~ response:", response)
    } catch (error) {
      console.log("🚀 ~ verifyConnection ~ error:", error)     
    }
  }, []);

  return { isConnected, error, isLoading, verifyConnection };
}