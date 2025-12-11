'use server';
/**
 * @fileOverview AI flow for generating an image from a dream character profile.
 *
 * - generateImageFromProfile - A function that generates an image.
 * - GenerateImageFromProfileInput - The input type for the generateImageFromProfile function.
 * - GenerateImageFromProfileOutput - The return type for the generateImageFromProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateImageFromProfileInputSchema = z.object({
  profile: z.string().describe('The profile of the dream character.'),
});
export type GenerateImageFromProfileInput = z.infer<typeof GenerateImageFromProfileInputSchema>;

export const GenerateImageFromProfileOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image as a data URI.'),
});
export type GenerateImageFromProfileOutput = z.infer<typeof GenerateImageFromProfileOutputSchema>;

export async function generateImageFromProfile(
  input: GenerateImageFromProfileInput
): Promise<GenerateImageFromProfileOutput> {
  return generateImageFromProfileFlow(input);
}

const generateImageFromProfileFlow = ai.defineFlow(
  {
    name: 'generateImageFromProfileFlow',
    inputSchema: GenerateImageFromProfileInputSchema,
    outputSchema: GenerateImageFromProfileOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `Generate an artistic, dream-like image based on the following description. The face of the person should be blurred or obscured. Style: ethereal, surreal. ${input.profile}`,
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
