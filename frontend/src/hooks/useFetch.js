import { useState, useEffect } from "react";

export const useFetch = (url, options = {}, dependences = []) => {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        // Force no-cache to always get fresh data
        const fetchOptions = { ...options, cache: 'no-store' };
        const response = await fetch(url, fetchOptions);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText} , ${response.status}`);
        }
        setData(responseData);
        setError();
      } catch (error) {
        setError(error);
      } finally {
        setloading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependences);

  return { data, loading, error };
}