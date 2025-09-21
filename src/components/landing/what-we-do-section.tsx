'use client';

import { Card } from '@/components/ui/card';
import { Video, FileText, Users, Briefcase, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const features = [
    {
        icon: Video,
        title: "Video Guides",
        description: "US visa interview preparation videos",
        href: "/features"
    },
    {
        icon: FileText,
        title: "Document Templates",
        description: "German visa application document templates",
        href: "/document-check"
    },
    {
        icon: Users,
        title: "Verified Agents",
        description: "Connect with trusted immigration experts",
        href: "/verified-agents"
    },
    {
        icon: Briefcase,
        title: "Industry-Specific Tips",
        description: "Tailored advice for different professions",
        href: "/features"
    }
];

export function WhatWeDoSection() {
  return (
    <section className="py-12 md:py-20 bg-slate-900 text-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your complete toolkit for a successful visa application.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
              <Card key={feature.title} className="text-center p-6 h-full flex flex-col group transition-all hover:shadow-lg hover:-translate-y-1 bg-slate-800/50 border-slate-700 hover:border-primary">
                  <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <feature.icon className="w-8 h-8"/>
                      </div>
                  </div>
                  <h3 className="font-bold text-lg text-slate-100">{feature.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 flex-grow">{feature.description}</p>
                  <Link href={feature.href} className="text-sm text-primary hover:underline flex items-center justify-center gap-1.5 font-medium mt-auto group-hover:text-amber-400 transition-colors">
                      <LinkIcon className="w-3.5 h-3.5" />
                      Learn More
                  </Link>
              </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatWeDoSection;
