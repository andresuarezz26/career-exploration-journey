
import React, { useState } from 'react';
import Header from '@/components/Header';
import TestInput from '@/components/TestInput';
import Analysis from '@/components/Analysis';
import { Toaster } from '@/components/ui/toaster';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-explora-light">
      <Header />
      
      <main className="explora-container">
        <div className="max-w-3xl mx-auto text-center mb-12 pt-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Discover Your <span className="gradient-text">Ideal Career</span> Path
          </h1>
          <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
            Explora helps students understand their strengths and explore career options 
            that match their unique abilities and interests.
          </p>
        </div>
        
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="input" disabled={isLoading}>Test Input</TabsTrigger>
            <TabsTrigger value="results" disabled={!analysisData || isLoading}>Analysis Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <TestInput 
                  onAnalysisComplete={handleAnalysisComplete} 
                  setIsLoading={setIsLoading}
                />
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-explora-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">1</div>
                      <p className="text-sm">Paste your psychological test results in JSON format</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-explora-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">2</div>
                      <p className="text-sm">Our AI analyzes your unique strengths and aptitudes</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-explora-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">3</div>
                      <p className="text-sm">Receive personalized career recommendations and insights</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>About Explora</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Explora uses advanced AI to help students understand their psychological test 
                      results and discover career paths that align with their natural abilities and interests.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {isLoading && (
              <div className="mt-8 text-center">
                <div className="inline-block p-4 bg-white rounded-lg shadow-md">
                  <div className="animate-bounce-light text-explora-primary text-lg font-medium">
                    Analyzing your test results...
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    This may take a few moments
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="results">
            {analysisData && <Analysis analysisData={analysisData} />}
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="mt-20 py-6 bg-white border-t">
        <div className="explora-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="font-semibold gradient-text">Explora</span>
              <span className="text-sm text-muted-foreground">Career Exploration Journey</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Helping students discover their career potential
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
