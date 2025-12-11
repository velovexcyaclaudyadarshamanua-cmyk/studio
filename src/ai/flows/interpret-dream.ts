'use server';
/**
 * @fileOverview A flow to interpret the meaning of a dream.
 *
 * - interpretDream - A function that provides an interpretation of a dream.
 */

import { ai } from '@/ai/genkit';
import {
  InterpretDreamInputSchema,
  InterpretDreamOutputSchema,
  type InterpretDreamInput,
  type InterpretDreamOutput,
} from '@/ai/schemas/interpret-dream-schema';

export async function interpretDream(
  input: InterpretDreamInput
): Promise<InterpretDreamOutput> {
  return interpretDreamFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretDreamPrompt',
  input: { schema: InterpretDreamInputSchema },
  output: { schema: InterpretDreamOutputSchema },
  prompt: `You are an expert dream interpreter. Analyze the following dream story and provide a thoughtful, insightful interpretation of its potential meaning. Consider symbols, emotions, and common dream themes.

Dream Story:
{{{dreamStory}}}

Provide your interpretation.`,
});

const interpretDreamFlow = ai.defineFlow(
  {
    name: 'interpretDreamFlow',
    inputSchema: InterpretDreamInputSchema,
    outputSchema: InterpretDreamOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
