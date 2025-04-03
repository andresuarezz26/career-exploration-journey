
import OpenAI from 'openai';

export const analyzeTestResults = async (testResults: any, apiKey: string) => {
  console.log('Received test results:', testResults);
  
  // Create OpenAI instance with provided API key
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });
  
  try {
    // Log the specific structure of the test results
    console.log('Test results type:', typeof testResults);
    console.log('Test results keys:', Object.keys(testResults));
    
    const traits = generatePersonalityInsights(testResults);
    console.log('Generated traits:', traits);
    
    const careerRecommendations = await generateCareerRecommendations(openai, traits);
    
    // Create a simple summary based on traits
    const topTraits = [...traits].sort((a, b) => b.score - a.score).slice(0, 3);
    const summary = `Based on your test results, your top strengths are ${topTraits.map(t => t.name).join(', ')}. We've analyzed these traits to recommend suitable career paths.`;
    
    return {
      personalityInsights: traits,
      careerRecommendations,
      summary,
      // Convert traits to aptitude scores format for charts
      aptitudeScores: traits.map(trait => ({
        name: trait.name,
        value: trait.score
      }))
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

  // Extract traits/scores from different possible JSON structures
  let traits = [];
  
  if (parsedResults.traits) {
    // If traits array is directly available
    traits = parsedResults.traits;
  } else if (parsedResults.personality) {
    // If traits are in a personality property
    traits = parsedResults.personality;
  } else if (parsedResults.scores) {
    // If we have a scores object, convert it to traits
    traits = Object.entries(parsedResults.scores).map(([name, score]) => ({
      name,
      score,
      description: `Your ${name} aptitude score is ${score}`
    }));
  } else {
    throw new Error('Cannot find personality traits or scores in the test results');
  }
  
  return traits.map((trait: any) => ({
    name: trait.name || trait.trait || 'Unknown Trait',
    score: trait.score || trait.value || 0,
    description: trait.description || `Your ${trait.name || 'trait'} score is ${trait.score || 0}`
  }));
};

const generateCareerRecommendations = async (openai: OpenAI, traits: any[]) => {
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
