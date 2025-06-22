import { useCallback, useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import {
  Registration,
  TicketFile,
  UseTicketFilesReturn,
} from '~/types/data/ticket.type';
const STORAGE_BUCKET = 'qrtest';
const FILE_LIMIT = 100;

export const useTicketFiles = (
  userId: string | undefined
): UseTicketFilesReturn => {
  const [state, setState] = useState<{
    files: TicketFile[];
    loading: boolean;
    error: string | null;
  }>({
    files: [],
    loading: true,
    error: null,
  });

  const fetchFiles = useCallback(async (): Promise<void> => {
    if (!userId) {
      setState(prev => ({ ...prev, files: [], loading: false }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Fetch files from storage
      const { data: storageFiles, error: storageError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .list(userId, {
          limit: FILE_LIMIT,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (storageError)
        throw new Error(`Storage error: ${storageError.message}`);
      if (!storageFiles?.length) {
        setState(prev => ({ ...prev, files: [], loading: false }));
        return;
      }

      // Get registration IDs from filenames
      const registrationIds = storageFiles.map(file =>
        file.name.replace(/\.[^/.]+$/, '')
      );

      // Fetch corresponding registrations with event data
      const { data: registrationsData, error: registrationsError } =
        await supabase
          .from('events_registrations')
          .select(
            `
          id,
          code,
          event:events (
            title,
            location,
            start_time
          )
        `
          )
          .in('id', registrationIds)
          .eq('user_id', userId);

      if (registrationsError)
        throw new Error(`Database error: ${registrationsError.message}`);

      const registrations = registrationsData as unknown as Registration[];

      // Map files to ticket data
      const filesWithEventData = storageFiles.reduce<TicketFile[]>(
        (acc, file) => {
          const registrationId = file.name.replace(/\.[^/.]+$/, '');
          const registration = registrations.find(
            reg => reg.id === registrationId
          );

          if (!registration?.event) {
            console.warn(`Missing data for file: ${file.name}`);
            return acc;
          }

          acc.push({
            id: registration.id,
            name: file.name,
            imageUrl: supabase.storage
              .from(STORAGE_BUCKET)
              .getPublicUrl(`${userId}/${file.name}`).data.publicUrl,
            eventTitle: registration.event.title || 'Unknown Event',
            eventLocation: registration.event.location || 'Unknown Location',
            eventStartTime: registration.event.start_time || '',
            registrationCode: registration.code,
          });

          return acc;
        },
        []
      );

      setState(prev => ({ ...prev, files: filesWithEventData }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch ticket files';

      console.error('Ticket files error:', error);
      setState(prev => ({ ...prev, error: errorMessage }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [userId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    files: state.files,
    loading: state.loading,
    error: state.error,
    refreshFiles: fetchFiles,
  };
};
