import { useCallback, useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';

export const useQuotesData = () => {
  const [quotes, setQuotes] = useState<
    { id: number; quote: string; theme: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 10; // Number of quotes to load per page

  const fetchQuotes = useCallback(async (pageToLoad: number = 0) => {
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('quotes')
        .select('*')
        .order('id', { ascending: true }) // Order by primary key
        .range(pageToLoad * PAGE_SIZE, (pageToLoad + 1) * PAGE_SIZE - 1);

      if (fetchError) throw fetchError;

      // If we get less than PAGE_SIZE items, we've reached the end
      setHasMore((data?.length || 0) >= PAGE_SIZE);

      // If it's the first page, replace the quotes, otherwise append
      if (pageToLoad === 0) {
        setQuotes(data || []);
      } else {
        setQuotes(prev => [...prev, ...(data || [])]);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error fetching quotes');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchQuotes(nextPage);
    }
  }, [loading, hasMore, page, fetchQuotes]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      await fetchQuotes(0); // Always load first page on initial mount
    };
    if (isMounted) load();
    return () => {
      isMounted = false;
    };
  }, [fetchQuotes]);

  return {
    quotes,
    loading,
    error,
    refetch: () => fetchQuotes(0), // Reset to first page on refetch
    loadMore,
    hasMore,
  };
};
