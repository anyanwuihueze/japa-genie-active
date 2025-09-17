'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Keep existing ones
const MockInterviewSection = dynamic(
  () => import('./mock-interview-section').then(mod => mod.MockInterviewSection),
  { loading: () => <Skeleton className="h-[500px] w-full" /> }
);

const TestimonialsSection = dynamic(
  () => import('./testimonials-section').then(mod => mod.TestimonialsSection),
  { loading: () => <Skeleton className="h-[400px] w-full" /> }
);

// Add new one
const HowItWorksAnimated = dynamic(
  () => import('./how-it-works-animated').then(mod => mod.HowItWorksAnimated),
  { loading: () => <Skeleton className="h-[600px] w-full" /> }
);

export default function LandingClient() {
  return (
    <>
      <HowItWorksAnimated />
      <MockInterviewSection />
      <TestimonialsSection />
    </>
  );
}