'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HowItWorksAnimated() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">How Japa Genie Works</h2>
        <p className="text-lg text-gray-600 mb-12">Coming soon...</p>
        
        {/* Placeholder */}
        <div className="bg-white rounded-xl p-8 border shadow-sm">
          <p>Animation section loading...</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksAnimated;
