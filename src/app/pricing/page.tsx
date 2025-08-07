import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    frequency: '/month',
    description: 'For individuals starting their visa journey.',
    features: [
      'Basic Visa Recommendations',
      'Interactive Progress Map',
      'AI Chat Assistant (5 questions/day)',
    ],
    cta: 'Get Started for Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    frequency: '/month',
    description: 'For those who need comprehensive support.',
    features: [
      'Everything in Starter, plus:',
      'Unlimited Visa Recommendations',
      'AI Document Checker (5 docs/month)',
      'Full Insights Canvas Access',
      'Unlimited AI Chat',
      'Priority Email Support',
    ],
    cta: 'Choose Pro',
    popular: true,
  },
  {
    name: 'Premium',
    price: '$79',
    frequency: '/month',
    description: 'For complex cases and maximum peace of mind.',
    features: [
      'Everything in Pro, plus:',
      'Unlimited Document Checks',
      'Advanced Scenario Analysis',
      '1-on-1 Onboarding Call',
      'Dedicated Account Manager',
    ],
    cta: 'Choose Premium',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Find the Plan That's Right for You</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Simple, transparent pricing. No hidden fees.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col ${tier.popular ? 'border-primary ring-2 ring-primary shadow-lg' : ''}`}
          >
            {tier.popular && (
              <div className="py-1 px-4 bg-primary text-primary-foreground text-sm font-semibold rounded-t-lg text-center">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground">{tier.frequency}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
