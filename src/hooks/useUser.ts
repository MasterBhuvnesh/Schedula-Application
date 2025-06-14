import { useUser } from '@clerk/clerk-expo';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import { User } from '~/types/data/user.type';

export const useUserData = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = useCallback(async () => {
    if (!user?.id) {
      setUserData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', user.id)
        .single();

      if (fetchError) throw fetchError;
      if (!data) {
        setError('User not found');
        setUserData(null);
        return;
      }

      setUserData(data as User);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error fetching user data');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      await fetchUserData();
    };
    if (isMounted) load();
    return () => {
      isMounted = false;
    };
  }, [fetchUserData]);

  return { userData, loading, error, refetch: fetchUserData };
};
