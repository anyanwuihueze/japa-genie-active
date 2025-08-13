
'use client';

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Sparkles, ArrowRight } from "lucide-react";
import { JapaGenieLogo } from "../icons";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center pt-20 overflow-hidden md:pt-24 min-h-screen bg-slate-900">
       <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
        poster="https://placehold.co/1920x1080/000000/FFFFFF.png"
        data-ai-hint="abstract background"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Add an overlay to darken the video and make text more readable */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-20 text-center flex flex-col items-center">
        <div className="mb-6">
          <div className="animate-glow rounded-full">
            <JapaGenieLogo className="w-24 h-24 text-accent" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-amber-300 to-red-400 bg-clip-text text-transparent">
          STOP Getting Scammed by Fake Visa Agents. START Getting Real Results.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
          Japa Genie is your AI-powered guide for navigating the complex world of visas. Get personalized recommendations and a clear roadmap to your destination.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-amber-400 to-primary text-primary-foreground hover:shadow-lg transition-shadow rounded-full px-10 py-6 text-lg font-bold"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span>Start Your Journey</span>
            </Link>
          </Button>
          <Button
            variant="link"
            className="text-white hover:text-amber-400 text-lg group flex items-center gap-1"
            asChild
          >
            <Link href="/how-it-works">
              Learn How It Works
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
