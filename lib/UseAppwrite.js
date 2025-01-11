import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";

// Custom React hook for managing Appwrite API calls with state handling
export const useAppwrite = ({ fn, params = {}, skip = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (fetchParams) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams);
        setData(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  const refetch = async (newParams) => await fetchData(newParams);

  return { data, loading, error, refetch };
};
