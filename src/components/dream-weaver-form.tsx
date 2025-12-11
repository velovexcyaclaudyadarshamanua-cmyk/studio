'use client';

import { useActionState, use } from 'react';
import { getDreamReference } from '@/app/actions';
import type { FormState } from '@/app/form-state';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  ClipboardList,
  Info,
  Loader2,
  Map,
  Shirt,
  Sparkles,
  Theater,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const initialState: FormState = {
  status: 'idle',
};

export function DreamWeaverForm() {
  const [state, formAction, isPending] = useActionState(getDreamReference, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (state.status === 'error' && state.message) {
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="w-full max-w-3xl mx-auto py-8 md:py-12 px-4">
      <form ref={formRef} action={formAction} className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Theater className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl">
                  Describe the Scene
                </CardTitle>
                <CardDescription>
                  Focus on details other than the face to build a clear picture.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="clothing" className="flex items-center gap-2 font-semibold">
                <Shirt className="w-4 h-4 text-muted-foreground" />
                Clothing
              </Label>
              <Textarea
                id="clothing"
                name="clothing"
                placeholder="What was the person wearing? e.g., a long red coat, a vintage floral dress"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="environment"
                className="flex items-center gap-2 font-semibold"
              >
                <Map className="w-4 h-4 text-muted-foreground" />
                Environment
              </Label>
              <Textarea
                id="environment"
                name="environment"
                placeholder="Where did the dream take place? e.g., a misty forest, a bustling city at night"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="otherDetails"
                className="flex items-center gap-2 font-semibold"
              >
                <ClipboardList className="w-4 h-4 text-muted-foreground" />
                Other Details
              </Label>
              <Textarea
                id="otherDetails"
                name="otherDetails"
                placeholder="Any other details? e.g., carrying an old book, a distinctive walk, a unique piece of jewelry"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
        <Button type="submit" className="w-full" disabled={isPending} size="lg">
            {isPending ? (
                <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Weaving...
                </>
            ) : (
                <>
                <Sparkles className="mr-2 h-5 w-5" />
                Weave My Dream
                </>
            )}
        </Button>
      </form>

      <div className="mt-12">
        {state.status === 'idle' && (
          <div className="text-center text-muted-foreground py-8">
            <p className="italic">Your dream references will appear here.</p>
          </div>
        )}
        {state.status === 'needs_details' && state.message && (
          <Alert variant="default" className="bg-accent/50 border-accent">
            <Info className="h-4 w-4" />
            <AlertTitle className="font-bold">More Information Needed</AlertTitle>
            <AlertDescription>
              <p className="mb-4">{state.message}</p>
              <ul className="list-disc pl-5 space-y-1 font-medium">
                {state.suggestions?.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        {state.status === 'success' && state.profile && state.imageUrl && (
          <div className="space-y-6">
            <h2 className="text-3xl font-headline text-center font-bold tracking-tight">
              Possible Reference
            </h2>
            <Card
              className="animate-fade-in opacity-0"
            >
              <CardContent className="p-6">
                 <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <p className="text-card-foreground">{state.profile}</p>
                    </div>
                    <Image
                      src={state.imageUrl}
                      alt="Dream reference"
                      width={512}
                      height={512}
                      className="rounded-lg object-cover"
                      data-ai-hint="dream person"
                    />
                  </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
