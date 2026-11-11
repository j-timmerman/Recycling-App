export interface Profile {
  id: string;
  username: string | null;
  role: string;
  created_at: string;
}

export interface Submission {
  id: string;
  user_id: string;
  image_url: string;
  material_type: string | null;
  item_description: string | null;
  created_at: string;
  material: {
    display_name: string;
    is_generally_recyclable: boolean | null;
    instructions: string | null;
    source_url: string | null;
  } | null;
}
