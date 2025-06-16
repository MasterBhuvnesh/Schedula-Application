import { useCallback, useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import { Event } from '~/types/data/event.type';

export const useSponsoredEvent = () => {
  const [sponsoredEvent, setSponsoredEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSponsoredEvent = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: sponsorEventData, error: sponsorEventError } =
        await supabase
          .from('sponsor_event')
          .select('event_id')
          .order('created_at', { ascending: false });

      if (sponsorEventError) throw sponsorEventError;
      if (!sponsorEventData) {
        setLoading(false);
        return;
      }
      const eventId =
        sponsorEventData.length > 0 ? sponsorEventData[0].event_id : null;

      if (!eventId) {
        setLoading(false);
        setSponsoredEvent(null);
        return;
      }
      // Then fetch the actual event
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId);

      if (eventError) throw eventError;

      setSponsoredEvent(
        eventData && eventData.length > 0 ? eventData[0] : null
      );
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error fetching sponsored event');
      setSponsoredEvent(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSponsoredEvent();
  }, [fetchSponsoredEvent]);

  return {
    sponsoredEvent,
    loading,
    error,
    refetch: fetchSponsoredEvent,
  };
};
