
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
            Descubre Tu <span className="gradient-text">Carrera Ideal</span>
          </h1>
          <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
            Explora ayuda a los estudiantes a comprender sus fortalezas y explorar opciones de carrera 
            que coincidan con sus habilidades e intereses únicos.
          </p>
        </div>
        
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="input" disabled={isLoading}>Introducir Resultados</TabsTrigger>
            <TabsTrigger value="results" disabled={!analysisData || isLoading}>Resultados del Análisis</TabsTrigger>
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
                    <CardTitle>Cómo Funciona</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-explora-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">1</div>
                      <p className="text-sm">Pega tus resultados de prueba psicológica en formato JSON</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-explora-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">2</div>
                      <p className="text-sm">Nuestra IA analiza tus fortalezas y aptitudes únicas</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-explora-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">3</div>
                      <p className="text-sm">Recibe recomendaciones de carrera personalizadas y perspectivas</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Acerca de Explora</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Explora utiliza IA avanzada para ayudar a los estudiantes a comprender sus resultados 
                      de pruebas psicológicas y descubrir trayectorias profesionales que se alineen con sus 
                      habilidades naturales e intereses.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {isLoading && (
              <div className="mt-8 text-center">
                <div className="inline-block p-4 bg-white rounded-lg shadow-md">
                  <div className="animate-bounce-light text-explora-primary text-lg font-medium">
                    Analizando tus resultados...
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Esto puede tardar unos momentos
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
              <span className="text-sm text-muted-foreground">Viaje de Exploración de Carreras</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Ayudando a estudiantes a descubrir su potencial profesional
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
