import { HeroSection } from '@/components/landing/hero-section';
import { MockInterviewSection } from '@/components/landing/mock-interview-section';
import FeaturesPage from './features/page';

// Main landing page for the application
export default function Home() {
  return (
    <div className="-m-8">
      <HeroSection />
      <MockInterviewSection />
      <FeaturesPage />
    </div>
  );
}
