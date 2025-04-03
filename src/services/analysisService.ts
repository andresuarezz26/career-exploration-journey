
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const analyzeTestResults = async (testResults: any) => {
  console.log('Received test results:', testResults);
  
  try {
    // Log the specific structure of the test results
    console.log('Test results type:', typeof testResults);
    console.log('Test results keys:', Object.keys(testResults));
    
    const traits = generatePersonalityInsights(testResults);
    console.log('Generated traits:', traits);
    
    const careerRecommendations = await generateCareerRecommendations(traits);
    
    return {
      personalityInsights: traits,
      careerRecommendations
    };
  } catch (error) {
    console.error('Error in analyzeTestResults:', error);
    throw error;
  }
};

const generatePersonalityInsights = (testResults: any) => {
  console.log('Generating personality insights from:', testResults);
  
  // Add more robust error checking
  if (!testResults || typeof testResults !== 'object') {
    console.error('Invalid test results format');
    throw new Error('Invalid test results format');
  }

  // Assuming the test results might be a string that needs parsing
  const parsedResults = typeof testResults === 'string' 
    ? JSON.parse(testResults) 
    : testResults;

  console.log('Parsed results:', parsedResults);

  // More defensive approach to accessing nested properties
  const traits = parsedResults.traits || parsedResults.personality || [];
  
  if (!traits || traits.length === 0) {
    console.error('No traits found in test results');
    throw new Error('No personality traits found');
  }

  return traits.map((trait: any) => ({
    name: trait.name || 'Unknown Trait',
    score: trait.score || 0,
    description: trait.description || 'No description available'
  }));
};

const generateCareerRecommendations = async (traits: any[]) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: "You are a career counselor helping students understand their personality traits and potential career paths."
        },
        {
          role: "user",
          content: `Analyze these personality traits and provide career recommendations:
          ${JSON.stringify(traits, null, 2)}`
        }
      ],
      max_tokens: 300
    });

    return response.choices[0].message.content || "No recommendations available";
  } catch (error) {
    console.error('Error generating career recommendations:', error);
    return "Unable to generate career recommendations";
  }
};

export default {
  analyzeTestResults
};
