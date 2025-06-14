export type Event = {
  id: string;
  title: string;
  description: string;
  banner_image_url: string;
  start_time: string;
  end_time: string;
  location: string;
  price?: number;
  price_description?: string;
  category_id?: string;
  status: 'Upcoming' | 'Past';
  registration_status: 'Open' | 'Closed';
  created_at: string;
  updated_at: string;
};
