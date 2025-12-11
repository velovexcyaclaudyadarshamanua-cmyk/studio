import {z} from 'genkit';

export const GenerateImageFromProfileInputSchema = z.object({
  profile: z.string().describe('The profile of the dream character.'),
});
export type GenerateImageFromProfileInput = z.infer<typeof GenerateImageFromProfileInputSchema>;

export const GenerateImageFromProfileOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image as a data URI.'),
});
export type GenerateImageFromProfileOutput = z.infer<typeof GenerateImageFromProfileOutputSchema>;
