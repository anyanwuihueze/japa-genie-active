import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function YourNextSteps() {
  const plans = [
    {
      name: "Self-Starter",
      description: "For when you just need the right tools",
      price: "Free forever",
      features: [
        "Document checklist builder",
        "Proof of funds calculator",
        "Basic interview prep",
        "Community support forum"
      ],
      cta: "Start with free tools",
      highlight: false
    },
    {
      name: "Walk With Me",
      description: "AI + human hybrid help when you need guidance",
      price: "Less than a consultation",
      features: [
        "Everything in Self-Starter",
        "AI document checker (no flags!)",
        "Personalized application roadmap",
        "1 weekly check-in with guidance",
        "Interview simulation practice"
      ],
      cta: "Get guided help",
      highlight: true
    },
    {
      name: "Hold My Hand",
      description: "Concierge-level help for when you're overwhelmed",
      price: "Less than an agent's fee",
      features: [
        "Everything in Walk With Me",
        "Dedicated human guide",
        "Document preparation & review",
        "Interview prep with mock sessions",
        "24/7 priority support",
        "Asylum application support"
      ],
      cta: "Get full support",
      highlight: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            What Makes Sense for You?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pick what fits your situation right now. You can always change later — 
            this isn't a commitment, just your next step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl p-6 border ${
                plan.highlight 
                  ? 'bg-white shadow-xl border-blue-200 relative' 
                  : 'bg-white border-gray-100'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    Most choose this
                  </span>
                </div>
              )}
              
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <p className="text-2xl font-bold text-blue-600 mb-1">{plan.price}</p>
                <p className="text-sm text-gray-500">
                  For less than what you'd spend on a visa agent's consultation, 
                  I'll guide you step by step — without the judgment.
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.highlight ? "default" : "secondary"} 
                className="w-full"
                asChild
              >
                <Link href="/chat">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
