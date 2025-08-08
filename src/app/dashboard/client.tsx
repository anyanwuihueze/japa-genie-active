'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateVisaInsights } from '@/ai/flows/insights-canvas';
import type { VisaInsightsOutput } from '@/ai/flows/insights-canvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ArrowDownUp, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  profile: z.string().min(50, 'Please provide a more detailed profile (at least 50 characters).'),
  destination: z.string().min(2, 'Destination is required.'),
  budget: z.coerce.number().positive('Budget must be a positive number.'),
});

type SortKey = 'visaType' | 'estimatedCost' | 'approvalChance' | 'processingTime';

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Request timed out after ${ms}ms`));
    }, ms);

    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

export default function DashboardClient() {
  const { toast } = useToast();
  const [insights, setInsights] = useState<VisaInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>('approvalChance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile: '',
      destination: '',
      budget: 10000,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setInsights(null);
    try {
      const result = await withTimeout(generateVisaInsights(values), 30000);
      console.log('Received insights result:', result);
      setInsights(result);
    } catch (e) {
      console.error("Failed to generate insights:", e);
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Error Generating Insights',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const sortedVisaOptions = useMemo(() => {
    if (!insights) return [];
    return [...insights.visaOptions].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if(typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [insights, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const costData = insights
    ? [
        { name: 'Application Fees', value: insights.costEstimates.applicationFees, fill: 'var(--color-application)' },
        { name: 'Legal Fees', value: insights.costEstimates.legalFees, fill: 'var(--color-legal)' },
        { name: 'Other Expenses', value: insights.costEstimates.otherExpenses, fill: 'var(--color-other)' },
      ]
    : [];

  const chartConfig: ChartConfig = {
    costs: {
      label: 'Costs',
    },
    application: {
      label: 'Application',
      color: 'hsl(var(--chart-1))',
    },
    legal: {
      label: 'Legal',
      color: 'hsl(var(--chart-2))',
    },
    other: {
      label: 'Other',
      color: 'hsl(var(--chart-3))',
    },
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Visa Inquiry</CardTitle>
          <CardDescription>Fill out your details to get personalized AI-powered visa insights.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Profile</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your background, education, work experience, and any relevant skills..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>The more detail, the better the recommendations.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intended Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Canada, United Kingdom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 10000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Insights...
                  </>
                ) : (
                  'Get Insights'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
         <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64 lg:col-span-1" />
            </div>
            <Skeleton className="h-96" />
         </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {insights && (
        <div className="space-y-8">
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle>AI Insights Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{insights.insightsSummary}</p>
            </CardContent>
          </Card>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Visa Options Analysis</CardTitle>
                <CardDescription>Comparison of approval chance for recommended visas.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-64">
                    <BarChart data={insights.visaOptions} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="visaType" tick={{ fontSize: 12 }} />
                        <YAxis unit="%" />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="approvalChance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estimated Cost Breakdown</CardTitle>
                <CardDescription>Total: ${insights.costEstimates.totalCost.toLocaleString()}</CardDescription>
              </Header>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64 mx-auto">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie data={costData} dataKey="value" nameKey="name" innerRadius={50} strokeWidth={5}>
                        {costData.map((entry) => (
                           <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                        ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Legend
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                    {costData.map((entry) => (
                        <div key={entry.name} className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: entry.fill}}/>
                            {entry.name}
                        </div>
                    ))}
                </div>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personalized Visa Recommendations</CardTitle>
              <CardDescription>Here are the visa options we recommend based on your profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => handleSort('visaType')} className="cursor-pointer"><div className="flex items-center gap-2">Visa Type <ArrowDownUp className="h-3 w-3" /></div></TableHead>
                    <TableHead onClick={() => handleSort('estimatedCost')} className="cursor-pointer text-right"><div className="flex items-center gap-2 justify-end">Est. Cost (USD) <ArrowDownUp className="h-3 w-3" /></div></TableHead>
                    <TableHead onClick={() => handleSort('approvalChance')} className="cursor-pointer text-right"><div className="flex items-center gap-2 justify-end">Approval Chance <ArrowDownUp className="h-3 w-3" /></div></TableHead>
                    <TableHead onClick={() => handleSort('processingTime')} className="cursor-pointer"><div className="flex items-center gap-2">Processing Time <ArrowDownUp className="h-3 w-3" /></div></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedVisaOptions.map((option) => (
                    <TableRow key={option.visaType}>
                      <TableCell className="font-medium">{option.visaType}</TableCell>
                      <TableCell className="text-right">${option.estimatedCost.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{option.approvalChance}%</TableCell>
                      <TableCell>{option.processingTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

    