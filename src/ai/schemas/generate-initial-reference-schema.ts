import {z} from 'genkit';

export const GenerateInitialReferenceInputSchema = z.object({
  clothing: z.string().describe('Description of the person\'s clothing in the dream.'),
  environment: z.string().describe('Description of the environment in the dream.'),
  otherDetails: z.string().describe('Any other details about the person, excluding facial features.'),
});
export type GenerateInitialReferenceInput = z.infer<typeof GenerateInitialReferenceInputSchema>;

export const NeedsMoreDetailsSchema = z.boolean().describe('True if the AI requires more details to provide a good reference, false otherwise.');
export const PossibleProfileSchema = z.string().describe('A single possible profile of the person from the dream.');

export const GenerateInitialReferenceOutputSchema = z.object({
  needsMoreDetails: NeedsMoreDetailsSchema,
  possibleProfile: PossibleProfileSchema,
});
export type GenerateInitialReferenceOutput = z.infer<typeof GenerateInitialReferenceOutputSchema>;
