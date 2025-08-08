import { HeroSection } from '@/components/landing/hero-section';
import { MockInterviewSection } from '@/components/landing/mock-interview-section';
import FeaturesPage from './features/page';

export default function Home() {
  return (
    <div className="-m-8">
      <HeroSection />
      <MockInterviewSection />
      <FeaturesPage />
    </div>
  );
}
