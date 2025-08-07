import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Map, BarChart3, CheckCircle, Sparkles, DollarSign } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: Sparkles,
    title: 'Personalized Visa Recommendations',
    description: 'Our AI analyzes your profile to suggest the best visa options, complete with estimated costs, processing times, and success rates.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'data analysis',
    },
  },
  {
    icon: Bot,
    title: 'AI Chat Assistant',
    description: 'Get real-time answers to all your visa-related questions, 24/7. Our AI assistant is trained on a vast knowledge base of immigration data.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'robot chat',
    },
  },
  {
    icon: Map,
    title: 'Interactive Progress Map',
    description: 'Visually track every stage of your application. Understand what to expect at each step, from document submission to visa approval.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'travel map',
    },
  },
  {
    icon: CheckCircle,
    title: 'AI Document Checker',
    description: 'Avoid common pitfalls. Upload your documents, and our AI will check for completeness and correct formatting, ensuring a smooth submission.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'document verification',
    },
  },
  {
    icon: BarChart3,
    title: 'Insights Canvas',
    description: 'Dive deep into your options with interactive charts and graphs. Visualize cost breakdowns and compare visa success chances effortlessly.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'financial chart',
    },
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden fees. Choose a subscription plan that fits your needs with clear, upfront pricing. Start with our free plan to explore core features.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'money savings',
    },
  },
];

export default function FeaturesPage() {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Features Crafted for You</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Japa Genie is packed with powerful, AI-driven tools to make your visa application process as simple and stress-free as possible.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="flex flex-col overflow-hidden transition-all hover:scale-105 hover:shadow-xl">
            <div className="relative h-48 w-full">
               <Image src={feature.image.src} alt={feature.title} layout="fill" objectFit="cover" data-ai-hint={feature.image.hint} />
            </div>
            <CardHeader className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <feature.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
