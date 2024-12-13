import { useEffect } from "react";

const TestConnection = () => {
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch("/api/connect");
        const data = await response.json();
        console.log("Database status:", data);
      } catch (error) {
        console.error("Error connecting to database:", error);
      }
    };

    checkConnection();
  }, []);

  return <div>Testing database connection...</div>;
};

export default TestConnection;