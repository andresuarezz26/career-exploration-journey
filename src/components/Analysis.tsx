
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
          <CardTitle className="text-2xl gradient-text">Career Analysis Results</CardTitle>
          <CardDescription>Based on your psychological test results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-2">Summary</h3>
            <p className="text-muted-foreground">{summary || "Based on your test results, we've analyzed your strengths and aptitudes to suggest suitable career paths."}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalysisChart 
          data={aptitudeScoresData || []} 
          chartType="radar" 
          title="Aptitude Profile"
        />
        <AnalysisChart 
          data={careerMatches || []} 
          chartType="bar" 
          title="Career Matches"
        />
      </div>

      <Tabs defaultValue="recommendations">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="strengths">Strengths</TabsTrigger>
          <TabsTrigger value="growth">Growth Areas</TabsTrigger>
          <TabsTrigger value="personality">Personality</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Career Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(careerRecommendations) ? (
                <ul className="space-y-2">
                  {careerRecommendations.map((career, index) => (
                    <li key={index} className="p-3 rounded-md bg-explora-light hover:bg-explora-accent/20 transition-colors">
                      {career}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="whitespace-pre-line">
                  {careerRecommendations || "No specific recommendations available."}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strengths">
          <Card>
            <CardHeader>
              <CardTitle>Key Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(strengths) ? (
                <ul className="list-disc pl-5 space-y-1">
                  {strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              ) : (
                <p>{strengths || "No specific strengths identified."}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>Areas for Growth</CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(areasOfGrowth) ? (
                <ul className="list-disc pl-5 space-y-1">
                  {areasOfGrowth.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              ) : (
                <p>{areasOfGrowth || "No specific growth areas identified."}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personality">
          <Card>
            <CardHeader>
              <CardTitle>Personality Insights</CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(personalityInsights) ? (
                <ul className="space-y-4">
                  {personalityInsights.map((trait, index) => (
                    <li key={index} className="p-3 bg-explora-light/50 rounded-lg">
                      <div className="font-medium">{trait.name} - Score: {trait.score}/100</div>
                      <div className="mt-1 text-sm text-muted-foreground">{trait.description}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="whitespace-pre-line">{formattedPersonalityInsights || "No personality insights available."}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analysis;
