'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Video, FileText, Calendar, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const interviewQuestions = [
  'Can you explain your study plans in detail?',
  'How will you finance your education?',
  'What are your plans after graduation?',
  'Do you have any relatives in the country?',
  'Why did you choose this specific university?',
];

const features = [
    {
        icon: Video,
        title: "Video Guides",
        description: "US visa interview preparation videos",
        href: "/features/video-guides"
    },
    {
        icon: FileText,
        title: "Document Templates",
        description: "German visa application document templates",
        href: "/features/document-templates"
    },
    {
        icon: Calendar,
        title: "Interview Scheduler",
        description: "Book mock interviews with experts",
        href: "/features/interview-scheduler"
    },
    {
        icon: Briefcase,
        title: "Industry-Specific Tips",
        description: "Tailored advice for different professions",
        href: "/features/industry-tips"
    }
]

export function MockInterviewSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Mock Interview Preparation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice with our AI-powered interview generator and increase your chances of approval.
          </p>
        </header>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full max-w-xl mx-auto grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="student">Student Visas</TabsTrigger>
            <TabsTrigger value="work">Work Permits</TabsTrigger>
            <TabsTrigger value="business">Business Visas</TabsTrigger>
            <TabsTrigger value="family">Family Reunification</TabsTrigger>
          </TabsList>
          <TabsContent value="student" className="mt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <Card className="bg-primary/5 h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Sample Interview Questions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <ul className="space-y-4 mb-8">
                    {interviewQuestions.map((question, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                     <Button size="lg" className="w-full bg-gradient-to-r from-amber-400 to-primary text-primary-foreground hover:shadow-lg transition-shadow">
                        Start Practice Interview <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <Link href={feature.href} key={feature.title} className="block hover:no-underline">
                    <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow group">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <feature.icon className="w-8 h-8"/>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="work"><p className="text-center text-muted-foreground">Work Permits content coming soon.</p></TabsContent>
          <TabsContent value="business"><p className="text-center text-muted-foreground">Business Visas content coming soon.</p></TabsContent>
          <TabsContent value="family"><p className="text-center text-muted-foreground">Family Reunification content coming soon.</p></TabsContent>
        </Tabs>
        
        <div className="text-center mt-20">
             <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                Real Results from Real Users
            </h2>
        </div>
      </div>
    </section>
  );
}
