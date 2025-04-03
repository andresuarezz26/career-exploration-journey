import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalysisChart from './AnalysisChart';

interface AnalysisProps {
  analysisData: any;
}

const Analysis: React.FC<AnalysisProps> = ({ analysisData }) => {
  if (!analysisData) return null;

  const {
    summary,
    careerRecommendations,
    strengths,
    areasOfGrowth,
    personalityInsights,
    aptitudeScores,
    careerMatches
  } = analysisData;

  // Convert personalityInsights array to a formatted string if it's an array
  const formattedPersonalityInsights = Array.isArray(personalityInsights)
    ? personalityInsights.map(trait => 
        `${trait.name}: ${trait.score}/100 - ${trait.description}`
      ).join('\n\n')
    : personalityInsights;

  // Use the array as aptitude scores data
  const aptitudeScoresData = Array.isArray(personalityInsights)
    ? personalityInsights.map(trait => ({
        name: trait.name,
        value: trait.score
      }))
    : aptitudeScores;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl gradient-text">Resultados del Análisis</CardTitle>
          <CardDescription>Basado en tus resultados de pruebas psicológicas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-2">Resumen</h3>
            <p className="text-muted-foreground">{summary || "Basado en tus resultados, hemos analizado tus fortalezas y aptitudes para sugerir carreras adecuadas."}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalysisChart 
          data={aptitudeScoresData || []} 
          chartType="radar" 
          title="Perfil de Aptitudes"
        />
        <AnalysisChart 
          data={careerMatches || []} 
          chartType="bar" 
          title="Carreras Recomendadas"
        />
      </div>

      <Tabs defaultValue="recommendations">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="recommendations">Análisis Detallado</TabsTrigger>
          <TabsTrigger value="strengths">Fortalezas</TabsTrigger>
          <TabsTrigger value="growth">Áreas de Desarrollo</TabsTrigger>
          <TabsTrigger value="personality">Personalidad</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis Personalizado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-muted-foreground">
                  {careerRecommendations || "No hay recomendaciones específicas disponibles."}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strengths">
          <Card>
            <CardHeader>
              <CardTitle>Fortalezas Principales</CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(strengths) ? (
                <ul className="list-disc pl-5 space-y-1">
                  {strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              ) : (
                <p>{strengths || "No se identificaron fortalezas específicas."}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>Áreas de Desarrollo</CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(areasOfGrowth) ? (
                <ul className="list-disc pl-5 space-y-1">
                  {areasOfGrowth.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              ) : (
                <p>{areasOfGrowth || "No se identificaron áreas de desarrollo específicas."}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personality">
          <Card>
            <CardHeader>
              <CardTitle>Insights de Personalidad</CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(personalityInsights) ? (
                <ul className="space-y-4">
                  {personalityInsights.map((trait, index) => (
                    <li key={index} className="p-3 bg-explora-light/50 rounded-lg">
                      <div className="font-medium">{trait.name} - Puntuación: {trait.score}/100</div>
                      <div className="mt-1 text-sm text-muted-foreground">{trait.description}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="whitespace-pre-line">{formattedPersonalityInsights || "No hay insights de personalidad disponibles."}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analysis;
