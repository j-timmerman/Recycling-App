// Matches RecyclingIdentification in server/schemas.py 
// and the fields added by server/app.py when a submission is saved.
export interface IdentificationResult {
  contains_recyclable_item: boolean;
  material_type: string | null;
  item_description: string | null;
  confidence: number | null;
  unidentified_reason: string | null;
  category?: string;
  display_name?: string;
  is_recyclable?: boolean;
  instructions?: string | null;
  source_url?: string | null;
  saved?: boolean;
  submission_id?: string;
}

export interface ApiError {
  error: string;
}
