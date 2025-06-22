export interface Event {
  title: string;
  location: string;
  start_time: string;
}

export interface Registration {
  id: string;
  code: string;
  event: Event;
}

export interface TicketFile {
  id: string;
  name: string;
  imageUrl: string;
  eventTitle: string;
  eventLocation: string;
  eventStartTime: string;
  registrationCode: string;
}

export interface UseTicketFilesReturn {
  files: TicketFile[];
  loading: boolean;
  error: string | null;
  refreshFiles: () => Promise<void>;
}
