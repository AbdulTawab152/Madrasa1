export interface Author {
  id: number;
  unique_id: string;
  first_name: string;
  last_name: string;
  father_name: string;
  grandfather_name: string;
  full_address: string;
  dob: string;
  image?: string | null;
  bio: string;
  is_published: boolean;
  contact_no?: string | null;
  is_alive: boolean;
}
