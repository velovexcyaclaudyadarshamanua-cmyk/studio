import { DreamWeaverForm } from '@/components/dream-weaver-form';
import { BrainCircuit } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-8 border-b bg-card">
        <div className="container mx-auto text-center px-4">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-2">
            <BrainCircuit className="w-10 h-10 md:w-12 md:h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
              Dream Weaver AI
            </h1>
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Describe the person with a blurred face from your dream, and let our
            AI help you find a reference.
          </p>
        </div>
      </header>
      <main className="flex-grow">
        <DreamWeaverForm />
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Dream Weaver AI. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
