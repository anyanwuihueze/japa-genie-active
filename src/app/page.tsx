import { HeroSection } from '@/components/landing/hero-section';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const MockInterviewSection = dynamic(() => import('@/components/landing/mock-interview-section').then(mod => mod.MockInterviewSection), {
  loading: () => <Skeleton className="h-[500px] w-full" />,
});
const TestimonialsSection = dynamic(() => import('@/components/landing/testimonials-section').then(mod => mod.TestimonialsSection), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
});
const FeaturesPage = dynamic(() => import('./features/page'), {
    loading: () => <Skeleton className="h-[600px] w-full" />,
});

// Main landing page for the application
export default function Home() {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-6 md:-mt-8">
      <HeroSection />
      <MockInterviewSection />
      <TestimonialsSection />
      <FeaturesPage />
    </div>
  );
}
