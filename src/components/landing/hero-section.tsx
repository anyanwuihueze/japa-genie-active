'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-amber-400 to-primary bg-clip-text text-transparent">
                STOP Getting Scammed by Visa Agents. START Getting Real Results.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Japa Genie is your AI-powered guide for navigating the complex world of visas. Get personalized recommendations and a clear roadmap to your destination.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
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
                variant="outline"
                size="lg"
                className="text-muted-foreground group flex items-center gap-1"
                asChild
              >
                <Link href="/how-it-works">
                  Learn How It Works
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <video 
              src="/videos/Welcome-to-Japa-Genie.mp4" 
              controls 
              loop
              className="rounded-lg shadow-2xl"
              width="550"
              height="310"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}