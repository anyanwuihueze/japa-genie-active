
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const oneTimeCredits = [
  {
    name: '1 Week Access',
    price: '$10',
    description: 'Perfect for a quick, focused effort.',
    features: [
      'Unlimited AI Wishes',
      'Full Access to All Tools',
      'Document Checker',
      'Mock Interviews',
    ],
    cta: 'Purchase for $10',
  },
  {
    name: '2 Weeks Access',
    price: '$15',
    description: 'Great for getting your application ready.',
    features: [
      'Unlimited AI Wishes',
      'Full Access to All Tools',
      'Document Checker',
      'Mock Interviews',
    ],
    cta: 'Purchase for $15',
  },
  {
    name: '3 Weeks Access',
    price: '$25',
    description: 'For a comprehensive review.',
    features: [
      'Unlimited AI Wishes',
      'Full Access to All Tools',
      'Document Checker',
      'Mock Interviews',
    ],
    cta: 'Purchase for $25',
  },
  {
    name: '4 Weeks Access',
    price: '$30',
    description: 'The best value for a full month.',
    features: [
      'Unlimited AI Wishes',
      'Full Access to All Tools',
      'Document Checker',
      'Mock Interviews',
    ],
    cta: 'Purchase for $30',
  },
];

const subscriptionTiers = [
  {
    name: 'Pro',
    price: '$20',
    frequency: '/month',
    description: 'For ongoing support and peace of mind.',
    features: [
      'Everything in one-time plans',
      'Continuous access',
      'Priority email support',
      'Cancel anytime',
    ],
    cta: 'Subscribe to Pro',
    popular: true,
  },
  {
    name: 'Premium',
    price: '$40',
    frequency: '/month',
    description: 'For those who want expert human help.',
    features: [
      'Everything in Pro, plus:',
      'Verified Agent Consultation (separate fee)',
      '1-on-1 Onboarding Call',
      'Dedicated Account Manager',
    ],
    cta: 'Subscribe to Premium',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Find the Plan That's Right for You</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Start with 3 free wishes. No credit card required.
        </p>
      </header>

      <Tabs defaultValue="subscriptions" className="w-full">
        <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="subscriptions">Monthly Subscriptions</TabsTrigger>
                <TabsTrigger value="credits">One-Time Credits</TabsTrigger>
            </TabsList>
        </div>
        
        <TabsContent value="subscriptions" className="mt-10">
            <div className="grid lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
                 {subscriptionTiers.map((tier) => (
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
        </TabsContent>

        <TabsContent value="credits" className="mt-10">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {oneTimeCredits.map((plan) => (
                <Card key={plan.name} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <p className="text-3xl font-bold pt-2">{plan.price}</p>
                        <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3">
                            {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start text-sm">
                                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                                <span className="text-muted-foreground">{feature}</span>
                            </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="secondary">{plan.cta}</Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
