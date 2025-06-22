export type EventRegistration = {
  id: string;
  event_id: string;
  user_id: string;
  code?: string;
  registration_time: string;
  status: boolean;
  checked_in_at: string | null;
  checked_in_by: string | null;
};

export type EventRegistrationInsert = Omit<
  EventRegistration,
  'id' | 'registration_time' | 'checked_in_at' | 'checked_in_by'
>;

export type EventRegistrationUpdate = Partial<
  Omit<EventRegistration, 'id' | 'event_id' | 'user_id' | 'registration_time'>
>;
export type EventRegistrationCheckIn = Omit<
  EventRegistration,
  'id' | 'code' | 'checked_in_at' | 'checked_in_by'
>;
