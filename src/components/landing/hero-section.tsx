'use client';

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 md:pt-24 bg-gradient-to-br from-[#0f172a] via-[#4338ca] to-[#f59e0b] relative overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        {/*
          This path assumes you have a 'videos' folder inside your 'public' directory,
          and your video file is named 'hero-video.mp4'.
          The final path will be /videos/hero-video.mp4
        */}
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Add an overlay to darken the video and make text more readable */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-amber-300 to-red-400 bg-clip-text text-transparent">
          STOP Getting Scammed. START Getting Results.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
          Japa Genie is your AI-powered guide for navigating the complex world of visas. Get personalized recommendations and a clear roadmap to your destination.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-genie-gold to-red-500 hover:from-red-500 hover:to-genie-gold text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            asChild
          >
            <Link href="/chat" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span>Start Your Journey</span>
            </Link>
          </Button>
          <Button
            variant="link"
            className="text-white hover:text-genie-gold text-lg group flex items-center gap-1"
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