
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { analyzeTestResults } from '@/services/analysisService';

interface TestInputProps {
  onAnalysisComplete: (analysisData: any) => void;
  setIsLoading: (loading: boolean) => void;
}

const TestInput: React.FC<TestInputProps> = ({ onAnalysisComplete, setIsLoading }) => {
  const [jsonInput, setJsonInput] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = async () => {
    try {
      // Validate JSON input
      JSON.parse(jsonInput);
      
      setIsLoading(true);
      const analysisResult = await analyzeTestResults(jsonInput);
      onAnalysisComplete(analysisResult);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Invalid JSON format",
        description: "Please check your input and try again",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setJsonInput(clipboardText);
      toast({
        title: "Content pasted",
        description: "Test results have been pasted from clipboard",
      });
    } catch (error) {
      toast({
        title: "Unable to access clipboard",
        description: "Please paste the content manually",
        variant: "destructive"
      });
    }
  };

  const exampleJson = JSON.stringify({
    "testName": "Career Aptitude Assessment",
    "studentName": "Alex Johnson",
    "age": 16,
    "testDate": "2023-10-15",
    "scores": {
      "analytical": 85,
      "creative": 92,
      "interpersonal": 78,
      "practical": 65,
      "verbal": 88,
      "numerical": 72
    },
    "interests": ["technology", "arts", "science", "helping others"]
  }, null, 2);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Paste Test Results</CardTitle>
        <CardDescription>
          Paste the psychological test results in JSON format below to get your career analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Paste your JSON test results here..."
          className="min-h-[200px] font-mono text-sm"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <div className="mt-4 flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setJsonInput(exampleJson)}
            className="text-xs"
          >
            Load Example
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePaste}
            className="text-xs"
          >
            Paste from Clipboard
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-gradient-to-r from-explora-primary to-explora-secondary hover:opacity-90"
        >
          Analyze Results
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestInput;
