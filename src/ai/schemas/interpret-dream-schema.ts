import { z } from 'genkit';

export const InterpretDreamInputSchema = z.object({
  dreamStory: z.string().describe('The detailed story of the dream.'),
});
export type InterpretDreamInput = z.infer<typeof InterpretDreamInputSchema>;

export const InterpretDreamOutputSchema = z.object({
  interpretation: z
    .string()
    .describe('The interpretation of the dream.'),
});
export type InterpretDreamOutput = z.infer<typeof InterpretDreamOutputSchema>;
