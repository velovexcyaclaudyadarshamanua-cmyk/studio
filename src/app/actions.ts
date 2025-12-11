
'use server';

import { generateInitialReference } from '@/ai/flows/generate-initial-reference';
import { suggestAdditionalTraits } from '@/ai/flows/suggest-additional-traits';
import { z } from 'zod';

export interface FormState {
  status: 'idle' | 'success' | 'needs_details' | 'error';
  message?: string;
  profiles?: string[];
  suggestions?: string[];
}

const DreamSchema = z.object({
  clothing: z.string(),
  environment: z.string(),
  otherDetails: z.string(),
});

export async function getDreamReference(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = DreamSchema.safeParse({
      clothing: formData.get('clothing'),
      environment: formData.get('environment'),
      otherDetails: formData.get('otherDetails'),
    });

    if (!validatedFields.success) {
      return {
        status: 'error',
        message: 'Invalid form data.',
      };
    }
    
    const { clothing, environment, otherDetails } = validatedFields.data;
    
    if (!clothing && !environment && !otherDetails) {
        return {
            status: 'error',
            message: 'Please fill out at least one field to generate a reference.',
        };
    }


    const aiResult = await generateInitialReference({
      clothing,
      environment,
      otherDetails,
    });

    if (aiResult.needsMoreDetails) {
      const dreamCharacterDescription = `Clothing: ${clothing}, Environment: ${environment}, Other Details: ${otherDetails}`;
      const suggestionsResult = await suggestAdditionalTraits({
        dreamCharacterDescription,
      });

      return {
        status: 'needs_details',
        message:
          'The dream is a bit vague. Can you add more details? Here are some ideas of what you could include:',
        suggestions: suggestionsResult.suggestedTraits.split(',').map(s => s.trim()),
      };
    }

    if (aiResult.possibleProfiles && aiResult.possibleProfiles.length > 0) {
      return {
        status: 'success',
        message: 'Here are some possible references based on your dream.',
        profiles: aiResult.possibleProfiles,
      };
    }

    return {
      status: 'error',
      message:
        'Could not generate a reference. The AI found no matches. Try a different description.',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
