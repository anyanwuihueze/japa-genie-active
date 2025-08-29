'use client' // MUST be at the very top

import { usePathname } from 'next/navigation'
import ChatLayout from './ChatLayout'
import React from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppHeader } from './app-header'
import { AppFooter } from './app-footer'

// Layout for all non-chat pages
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
        <AppHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {children}
          </div>
        </main>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function LayoutSwitcher({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith('/chat')) {
    return <ChatLayout>{children}</ChatLayout>
  }

  return <MainLayout>{children}</MainLayout>
}
