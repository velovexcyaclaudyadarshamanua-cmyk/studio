'use server';
/**
 * @fileOverview AI flow for generating an image from a dream character profile.
 *
 * - generateImageFromProfile - A function that generates an image.
 */

import {ai} from '@/ai/genkit';
import {
  GenerateImageFromProfileInputSchema,
  GenerateImageFromProfileOutputSchema,
  type GenerateImageFromProfileInput,
  type GenerateImageFromProfileOutput,
} from '@/ai/schemas/generate-image-from-profile-schema';

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
