import type {Metadata} from 'next';
import './globals.css'; // Styles from globals.css will apply
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

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
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="font-sans antialiased h-full flex flex-col bg-background text-foreground overflow-x-hidden m-0 p-0">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col flex-1 min-h-0">
            <div className="flex flex-col min-h-[100dvh]">
              <AppHeader />
              <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                  {children}
                </div>
              </main>
              <AppFooter />
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
