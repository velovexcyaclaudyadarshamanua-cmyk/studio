import {z} from 'genkit';

export const SuggestAdditionalTraitsInputSchema = z.object({
  dreamCharacterDescription: z
    .string()
    .describe('The description of the dream character.'),
});
export type SuggestAdditionalTraitsInput = z.infer<
  typeof SuggestAdditionalTraitsInputSchema
>;

export const SuggestAdditionalTraitsOutputSchema = z.object({
  suggestedTraits: z
    .string()
    .describe(
      'A list of suggested traits or details the user could provide about the dream character.'
    ),
});
export type SuggestAdditionalTraitsOutput = z.infer<
  typeof SuggestAdditionalTraitsOutputSchema
>;
