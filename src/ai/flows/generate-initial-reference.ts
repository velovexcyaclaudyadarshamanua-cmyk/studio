'use server';

/**
 * @fileOverview AI flow for generating a potential profile based on dream descriptions.
 *
 * - generateInitialReference - A function that generates a potential profile.
 * - GenerateInitialReferenceInput - The input type for the generateInitialReference function.
 * - GenerateInitialReferenceOutput - The return type for the generateInitialReference function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialReferenceInputSchema = z.object({
  clothing: z.string().describe('Description of the person\'s clothing in the dream.'),
  environment: z.string().describe('Description of the environment in the dream.'),
  otherDetails: z.string().describe('Any other details about the person, excluding facial features.'),
});
export type GenerateInitialReferenceInput = z.infer<typeof GenerateInitialReferenceInputSchema>;

const NeedsMoreDetailsSchema = z.boolean().describe('True if the AI requires more details to provide a good reference, false otherwise.');
const PossibleProfileSchema = z.string().describe('A single possible profile of the person from the dream.');

const GenerateInitialReferenceOutputSchema = z.object({
  needsMoreDetails: NeedsMoreDetailsSchema,
  possibleProfile: PossibleProfileSchema,
});

export type GenerateInitialReferenceOutput = z.infer<typeof GenerateInitialReferenceOutputSchema>;

const checkSufficientDetails = ai.defineTool({
  name: 'checkSufficientDetails',
  description: 'Checks if enough information has been provided to generate a good reference.',
  inputSchema: z.object({
    clothing: z.string().describe('Description of the person\'s clothing in the dream.'),
    environment: z.string().describe('Description of the environment in the dream.'),
    otherDetails: z.string().describe('Any other details about the person, excluding facial features.'),
  }),
  outputSchema: NeedsMoreDetailsSchema,
},
async (input) => {
  const combinedLength = input.clothing.length + input.environment.length + input.otherDetails.length;
  return combinedLength < 50; 
});


export async function generateInitialReference(input: GenerateInitialReferenceInput): Promise<GenerateInitialReferenceOutput> {
  return generateInitialReferenceFlow(input);
}

const generateInitialReferencePrompt = ai.definePrompt({
  name: 'generateInitialReferencePrompt',
  input: { schema: GenerateInitialReferenceInputSchema },
  output: { schema: GenerateInitialReferenceOutputSchema },
  tools: [checkSufficientDetails],
  prompt: `Based on the following details from a dream, generate a possible profile of the person seen in the dream. Exclude any facial details in your consideration, and only consider the details provided.

Clothing: {{{clothing}}}
Environment: {{{environment}}}
Other Details: {{{otherDetails}}}

Determine if you need more details using the checkSufficientDetails tool. If the tool indicates more details are needed, set needsMoreDetails to true and provide an empty string for possibleProfile.

Otherwise, generate a single possible profile, and set needsMoreDetails to false.

Your output should conform to the GenerateInitialReferenceOutputSchema.`,
});

const generateInitialReferenceFlow = ai.defineFlow(
  {
    name: 'generateInitialReferenceFlow',
    inputSchema: GenerateInitialReferenceInputSchema,
    outputSchema: GenerateInitialReferenceOutputSchema,
  },
  async input => {
    const { output } = await generateInitialReferencePrompt(input);
    return output!;
  }
);
