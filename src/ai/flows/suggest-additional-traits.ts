'use server';

/**
 * @fileOverview A flow to suggest additional traits for a dream character to improve reference matching.
 *
 * - suggestAdditionalTraits - A function that suggests additional traits.
 */

import {ai} from '@/ai/genkit';
import {
  SuggestAdditionalTraitsInputSchema,
  SuggestAdditionalTraitsOutputSchema,
  type SuggestAdditionalTraitsInput,
  type SuggestAdditionalTraitsOutput,
} from '@/ai/schemas/suggest-additional-traits-schema';

export async function suggestAdditionalTraits(
  input: SuggestAdditionalTraitsInput
): Promise<SuggestAdditionalTraitsOutput> {
  return suggestAdditionalTraitsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAdditionalTraitsPrompt',
  input: {schema: SuggestAdditionalTraitsInputSchema},
  output: {schema: SuggestAdditionalTraitsOutputSchema},
  prompt: `You are an AI assistant helping users to identify a person they saw in their dream.

  The user has provided the following description of the dream character: {{{dreamCharacterDescription}}}

  Suggest three additional traits or details the user could provide about the dream character to improve the accuracy of reference matching. Be specific and provide traits that are not already mentioned in the description.
  Do not ask any question back to the user. Format like 'Trait 1, Trait 2, Trait 3'.`,
});

const suggestAdditionalTraitsFlow = ai.defineFlow(
  {
    name: 'suggestAdditionalTraitsFlow',
    inputSchema: SuggestAdditionalTraitsInputSchema,
    outputSchema: SuggestAdditionalTraitsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
