import { useState, useCallback } from "react";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const call = useCallback(async (apiFunc, ...params) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunc(...params);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, call };
};
