import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import DashboardClient from './client';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Get personalized visa insights and recommendations.
        </p>
      </header>
      <DashboardClient />
    </div>
  );
}
