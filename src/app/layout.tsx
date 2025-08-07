import type {Metadata} from 'next';
import './globals.css'; // Styles from globals.css will apply
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';

export const metadata: Metadata = {
  title: 'Japa Genie: Your AI-Powered Visa Guide',
  description: 'Stop getting scammed by visa agents. Start getting real results today with Japa Genie. AI-powered visa guidance, eligibility checks, and personalized roadmaps.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased h-full flex flex-col bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
            <AppHeader />
            <main className="flex-grow container py-8">{children}</main>
            <AppFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
