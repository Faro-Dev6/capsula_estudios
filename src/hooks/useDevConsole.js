import { useState, useCallback } from "react";

export default function useDevConsole() {
  const [isDevConsoleOpen, setIsDevConsoleOpen] = useState(false);
  const [systemLogs, setSystemLogs] = useState([]);
  const [backendTransactions, setBackendTransactions] = useState([]);

  const addLog = useCallback((message) => {
    const time = new Date().toLocaleTimeString();

    setSystemLogs((prev) => [
      `[${time}] ${message}`,
      ...prev.slice(0, 49),
    ]);
  }, []);

  const clearLogs = () => setSystemLogs([]);

  return {
    isDevConsoleOpen,
    setIsDevConsoleOpen,
    systemLogs,
    setSystemLogs,
    backendTransactions,
    setBackendTransactions,
    addLog,
    clearLogs,
  };
}