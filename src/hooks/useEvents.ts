import { useCallback, useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import { Event } from '~/types/data/event.type';

export const useEventsData = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 10;

  const fetchEvents = useCallback(async (pageToLoad: number = 0) => {
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('events')
        .select('*')
        .order('status', { ascending: true })
        .order('registration_status', { ascending: true })
        .order('start_time', { ascending: false })
        .range(pageToLoad * PAGE_SIZE, (pageToLoad + 1) * PAGE_SIZE - 1);

      if (fetchError) throw fetchError;

      // If we get less than PAGE_SIZE items, we've reached the end
      setHasMore((data?.length || 0) >= PAGE_SIZE);

      // If it's the first page, replace the events, otherwise append
      if (pageToLoad === 0) {
        setEvents(data || []);
      } else {
        setEvents(prev => [...prev, ...(data || [])]);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error fetching events');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchEvents(nextPage);
    }
  }, [loading, hasMore, page, fetchEvents]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      await fetchEvents(0); // Always load first page on initial mount
    };
    if (isMounted) load();
    return () => {
      isMounted = false;
    };
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    refetch: () => fetchEvents(0), // Reset to first page on refetch
    loadMore,
    hasMore,
  };
};
