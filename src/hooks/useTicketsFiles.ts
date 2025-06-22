// // hooks/useTicketFiles.ts
// import { useCallback, useEffect, useState } from 'react';
// import { supabase } from '~/lib/supabase';

// export interface TicketFile {
//   name: string;
//   id: string;
//   imageUrl: string; // Add imageUrl to the interface
// }

// interface UseTicketFilesReturn {
//   files: TicketFile[];
//   loading: boolean;
//   error: string | null;
//   refreshFiles: () => Promise<void>;
// }

// export const useTicketFiles = (
//   userId: string | undefined
// ): UseTicketFilesReturn => {
//   const [files, setFiles] = useState<TicketFile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchFiles = useCallback(async (): Promise<void> => {
//     if (!userId) {
//       setFiles([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const { data, error: fetchError } = await supabase.storage
//         .from('qrtest')
//         .list(userId, {
//           limit: 100,
//           offset: 0,
//           sortBy: { column: 'name', order: 'asc' },
//         });

//       if (fetchError) {
//         throw new Error(fetchError.message);
//       }

//       // Map the files to include the image URL
//       const filesWithUrls = (data ?? []).map(file => ({
//         ...file,
//         imageUrl: supabase.storage
//           .from('qrtest')
//           .getPublicUrl(`${userId}/${file.name}`).data.publicUrl,
//       }));

//       setFiles(filesWithUrls);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : 'Failed to fetch files';
//       setError(errorMessage);
//       console.error('Error fetching ticket files:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     fetchFiles();
//   }, [fetchFiles]);

//   return {
//     files,
//     loading,
//     error,
//     refreshFiles: fetchFiles,
//   };
// };

// hooks/useTicketFiles.ts
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';

export interface TicketFile {
  id: string; // events_registration id
  name: string; // filename with extension
  imageUrl: string;
  eventTitle: string;
  eventLocation: string;
  eventStartTime: string;
  registrationCode: string;
}

interface UseTicketFilesReturn {
  files: TicketFile[];
  loading: boolean;
  error: string | null;
  refreshFiles: () => Promise<void>;
}

export const useTicketFiles = (
  userId: string | undefined
): UseTicketFilesReturn => {
  const [files, setFiles] = useState<TicketFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = useCallback(async (): Promise<void> => {
    if (!userId) {
      setFiles([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // First get the list of files from storage
      const { data: storageFiles, error: storageError } = await supabase.storage
        .from('qrtest')
        .list(userId, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (storageError) {
        throw new Error(storageError.message);
      }

      if (!storageFiles || storageFiles.length === 0) {
        setFiles([]);
        return;
      }

      // Extract UUIDs from filenames by removing extensions
      const registrationIds = storageFiles.map(file => {
        // Remove file extension (everything after last dot)
        return file.name.split('.').slice(0, -1).join('.');
      });

      // Query the events_registrations and events tables
      const { data: registrationsData, error: registrationsError } =
        await supabase.from('events_registrations').select(
          `
          id,
          code,
          event:events (
            title,
            location,
            start_time
          )
        `
        );
      //   .in('id', registrationIds)
      //   .eq('user_id', userId);

      if (registrationsError) {
        throw new Error(registrationsError.message);
      }

      // Create a map of registration IDs to their data for quick lookup
      const registrationsMap = new Map(
        (registrationsData || []).map(reg => [reg.id, reg])
      );

      // Combine the data, keeping the original filename with extension
      const filesWithEventData = storageFiles
        .map(file => {
          const registrationId = file.name.split('.').slice(0, -1).join('.');
          const registration = registrationsMap.get(registrationId);

          if (!registration) {
            return null; // Skip files without matching registration
          }

          return {
            id: registration.id,
            name: file.name, // Keep original filename with extension
            imageUrl: supabase.storage
              .from('qrtest')
              .getPublicUrl(`${userId}/${file.name}`).data.publicUrl,
            eventTitle: registration.event?.[0]?.title || 'Unknown Event',
            eventLocation:
              registration.event?.[0]?.location || 'Unknown Location',
            eventStartTime: registration.event?.[0]?.start_time || '',
            registrationCode: registration.code,
          };
        })
        .filter(Boolean) as TicketFile[]; // Remove null entries

      setFiles(filesWithEventData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch files';
      setError(errorMessage);
      console.error('Error fetching ticket files:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    files,
    loading,
    error,
    refreshFiles: fetchFiles,
  };
};
