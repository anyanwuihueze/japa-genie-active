
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { JapaGenieLogo } from "@/components/icons";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from '@/lib/utils';

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/how-it-works", label: "How it Works" },
    { href: "/pricing", label: "Pricing" },
  ];
  
  const NavLinkItems = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobileMenuOpen && toggleMobileMenu()}
          className={cn(
            "text-muted-foreground hover:text-primary transition-colors",
            pathname === link.href && "text-primary font-semibold"
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <JapaGenieLogo className="w-8 h-8 text-primary" />
          <span className="font-bold text-lg">Japa Genie</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLinkItems />
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
            <Button variant="ghost" asChild>
                <Link href="/dashboard">Log In</Link>
            </Button>
             <Button asChild>
                <Link href="/dashboard">Get Started <ArrowRight className="ml-2" /></Link>
            </Button>
        </div>

        <div className="flex items-center md:hidden ml-4">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="container pb-4">
             <nav className="flex flex-col items-start gap-4 mt-4">
                <NavLinkItems />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
