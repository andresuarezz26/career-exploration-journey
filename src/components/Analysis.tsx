
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
            <p className="text-muted-foreground">{summary}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalysisChart 
          data={aptitudeScores} 
          chartType="radar" 
          title="Aptitude Profile"
        />
        <AnalysisChart 
          data={careerMatches} 
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
              <ul className="space-y-2">
                {Array.isArray(careerRecommendations) ? (
                  careerRecommendations.map((career, index) => (
                    <li key={index} className="p-3 rounded-md bg-explora-light hover:bg-explora-accent/20 transition-colors">
                      {career}
                    </li>
                  ))
                ) : (
                  <p>{careerRecommendations || "No specific recommendations available."}</p>
                )}
              </ul>
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
              <p>{personalityInsights || "No personality insights available."}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analysis;
