'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateRejectionStrategy } from '@/ai/flows/rejection-reversal-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, Sparkles, Repeat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  visaType: z.string().min(2, 'Visa type is required.'),
  destination: z.string().min(2, 'Destination country is required.'),
  rejectionReason: z.string().optional(),
  userBackground: z.string().min(20, 'Please provide a brief background.'),
});

export default function RejectionReversalClient() {
  const { toast } = useToast();
  const [strategy, setStrategy] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visaType: 'Student Visa',
      destination: '',
      rejectionReason: '',
      userBackground: '',
    },
  });

  async function handleGenerateStrategy(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setStrategy(null);

    try {
      const result = await generateRejectionStrategy(values);
      setStrategy(result.strategy);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Error Generating Strategy',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-5 gap-12">
      <div className="md:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Situation</CardTitle>
            <CardDescription>Provide details about your visa rejection so our AI can build a comeback plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleGenerateStrategy)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="visaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visa Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a visa type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Student Visa">Student Visa</SelectItem>
                            <SelectItem value="Work Visa / Permit">Work Visa / Permit</SelectItem>
                            <SelectItem value="Tourist / Visitor Visa">Tourist / Visitor Visa</SelectItem>
                            <SelectItem value="Business Visa">Business Visa</SelectItem>
                            <SelectItem value="Family / Spousal Visa">Family / Spousal Visa</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination Country</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Canada, Germany" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="userBackground"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Brief Background</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'I am a software engineer with 5 years of experience...' or 'I have been accepted to study a Masters in Computer Science at...'"
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rejectionReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Official Rejection Reason (if any)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Copy and paste the reason from the rejection letter, e.g., 'You have not demonstrated sufficient financial ties to your home country.'"
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Comeback Strategy
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold">Your AI-Powered Strategy</h2>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && !strategy && (
            <Card className='h-96 flex flex-col items-center justify-center relative overflow-hidden'>
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
                <div className='text-center text-muted-foreground p-8 space-y-4 z-10'>
                     <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary/50" />
                     <p>Building your personalized comeback strategy... This may take a moment.</p>
                </div>
            </Card>
        )}

        {strategy ? (
          <Card>
            <CardHeader>
              <CardTitle>Reversal Plan</CardTitle>
              <CardDescription>Follow these steps to strengthen your next application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: strategy.replace(/\n/g, '<br />') }}
              />
            </CardContent>
          </Card>
        ) : (
            !isLoading && (
            <Card className='h-96 flex flex-col items-center justify-center bg-primary/5 border-dashed relative overflow-hidden'>
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className='text-center text-muted-foreground p-8 space-y-2 z-10'>
                     <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Repeat className="h-6 w-6 text-primary" />
                    </div>
                     <h3 className="text-lg font-semibold text-foreground">Your Plan Appears Here</h3>
                     <p>Fill out the form to get your step-by-step guide to overcoming your visa rejection.</p>
                </div>
            </Card>
            )
        )}
      </div>
    </div>
  );
}
