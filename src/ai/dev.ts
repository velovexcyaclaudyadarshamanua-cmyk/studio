import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-additional-traits.ts';
import '@/ai/flows/generate-initial-reference.ts';
import '@/ai/flows/interpret-dream.ts';
