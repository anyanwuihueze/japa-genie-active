'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const MockInterviewSection = dynamic(() => import('@/components/landing/mock-interview-section').then(mod => mod.MockInterviewSection), {
  loading: () => <Skeleton className="h-[500px] w-full" />,
});
const TestimonialsSection = dynamic(() => import('@/components/landing/testimonials-section').then(mod => mod.TestimonialsSection), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
});

export default function LandingClient() {
  return (
    <>
      <MockInterviewSection />
      <TestimonialsSection />
    </>
  );
}
