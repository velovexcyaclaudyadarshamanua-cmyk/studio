export interface FormState {
  status: 'idle' | 'success' | 'needs_details' | 'error';
  message?: string;
  profile?: string;
  imageUrl?: string;
  suggestions?: string[];
}
