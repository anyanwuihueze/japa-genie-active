
'use client';

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Sparkles, ArrowRight, PlayCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full bg-slate-900 text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="relative z-10 container mx-auto flex min-h-screen items-center px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-snug mb-6 bg-gradient-to-r from-white via-amber-300 to-red-400 bg-clip-text text-transparent">
              STOP Getting Scammed by Fake Visa Agents. START Getting Real Results.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed">
              Japa Genie is your AI-powered guide for navigating the complex world of visas. Get personalized recommendations and a clear roadmap to your destination.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Button
                size="lg"
                className="group w-full sm:w-auto bg-gradient-to-r from-amber-400 to-primary text-primary-foreground hover:shadow-lg transition-shadow rounded-full px-8 py-6 text-lg font-bold"
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

          {/* Right Column: Explainer Video */}
          <div className="flex items-center justify-center">
             <div className="w-full max-w-lg mx-auto p-2 rounded-xl shadow-2xl bg-slate-800/70 backdrop-blur-sm border border-slate-700">
                <div className="w-full aspect-video rounded-lg overflow-hidden relative">
                     <video
                        key="/videos/explainer-video.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute w-full h-full object-cover"
                        poster="https://placehold.co/1920x1080/000000/FFFFFF.png?text=Loading+Video..."
                        data-ai-hint="explainer video"
                    >
                        <source src="/videos/explainer-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <PlayCircle className="w-16 h-16 text-white/50" />
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
