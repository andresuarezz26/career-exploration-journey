
interface AnalysisResponse {
  summary: string;
  careerRecommendations: string[] | string;
  strengths: string[] | string;
  areasOfGrowth: string[] | string;
  personalityInsights: string;
  aptitudeScores: Record<string, number> | Array<{name: string, value: number}>;
  careerMatches: Array<{name: string, value: number}> | Record<string, number>;
}

export const analyzeTestResults = async (jsonData: string): Promise<AnalysisResponse> => {
  try {
    // For now, we'll create a mock analysis response
    // In production, this would integrate with OpenAI's API
    
    const parsedData = JSON.parse(jsonData);
    
    // Extract basic info from the test results
    const { scores, interests } = parsedData;
    
    // Calculate top aptitudes
    const aptitudeEntries = Object.entries(scores || {});
    const sortedAptitudes = [...aptitudeEntries].sort((a, b) => (b[1] as number) - (a[1] as number));
    const topAptitudes = sortedAptitudes.slice(0, 3).map(entry => entry[0]);
    
    // Create mock career matches based on aptitudes and interests
    const careerMatches = generateCareerMatches(scores, interests);
    
    // Return a structured analysis
    return {
      summary: `Based on your test results, you show particular strengths in ${topAptitudes.join(', ')}. Your combination of skills and interests suggests several promising career paths that would align well with your natural abilities.`,
      careerRecommendations: generateCareerRecommendations(scores, interests),
      strengths: [
        `Strong ${topAptitudes[0]} abilities`,
        `Good ${topAptitudes[1]} capabilities`,
        `Solid foundation in ${topAptitudes[2]}`
      ],
      areasOfGrowth: generateAreasOfGrowth(scores),
      personalityInsights: generatePersonalityInsights(scores, interests),
      aptitudeScores: Object.entries(scores || {}).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: value as number
      })),
      careerMatches
    };
  } catch (error) {
    console.error("Error analyzing test results:", error);
    throw error;
  }
};

// Helper functions to generate mock analysis data
function generateCareerRecommendations(
  scores: Record<string, number> = {},
  interests: string[] = []
): string[] {
  const careerMapping: Record<string, string[]> = {
    analytical: ["Data Scientist", "Business Analyst", "Research Scientist"],
    creative: ["Graphic Designer", "Writer", "Marketing Specialist"],
    interpersonal: ["Therapist", "Human Resources Manager", "Teacher"],
    practical: ["Engineer", "Architect", "Veterinarian"],
    verbal: ["Lawyer", "Journalist", "Public Relations Specialist"],
    numerical: ["Accountant", "Financial Analyst", "Mathematician"]
  };
  
  const interestMapping: Record<string, string[]> = {
    technology: ["Software Developer", "IT Project Manager", "Digital Designer"],
    arts: ["Art Director", "Museum Curator", "Fashion Designer"],
    science: ["Biologist", "Chemist", "Environmental Scientist"],
    "helping others": ["Social Worker", "Counselor", "Healthcare Professional"]
  };
  
  let recommendations: string[] = [];
  
  // Add careers based on top scores
  const topScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);
  
  topScores.forEach(([aptitude]) => {
    if (careerMapping[aptitude]) {
      recommendations = [...recommendations, ...careerMapping[aptitude]];
    }
  });
  
  // Add careers based on interests
  interests.forEach(interest => {
    if (interestMapping[interest.toLowerCase()]) {
      recommendations = [...recommendations, ...interestMapping[interest.toLowerCase()]];
    }
  });
  
  // Return unique career recommendations
  return [...new Set(recommendations)].slice(0, 5);
}

function generateAreasOfGrowth(scores: Record<string, number> = {}): string[] {
  const lowestScores = Object.entries(scores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2);
  
  return lowestScores.map(([area]) => {
    const growthAreas: Record<string, string> = {
      analytical: "Consider activities that strengthen logical thinking and problem-solving",
      creative: "Explore creative hobbies to develop your innovative thinking",
      interpersonal: "Practice communication and active listening skills",
      practical: "Gain more hands-on experience with practical projects",
      verbal: "Read more widely and practice writing in different styles",
      numerical: "Work on mathematical skills through puzzles or online courses"
    };
    
    return growthAreas[area] || `Develop your ${area} skills further`;
  });
}

function generatePersonalityInsights(
  scores: Record<string, number> = {}, 
  interests: string[] = []
): string {
  const highestScore = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const lowestScore = Object.entries(scores).sort((a, b) => a[1] - b[1])[0];
  
  let personalityType = "";
  
  if (scores.analytical > 80 && scores.numerical > 70) {
    personalityType = "analytical thinker";
  } else if (scores.creative > 80 && scores.verbal > 70) {
    personalityType = "creative communicator";
  } else if (scores.interpersonal > 80) {
    personalityType = "people-oriented collaborator";
  } else if (scores.practical > 80) {
    personalityType = "hands-on problem solver";
  } else {
    personalityType = "versatile adapter";
  }
  
  return `You appear to be a ${personalityType} with strong abilities in ${highestScore[0]} and potential for growth in ${lowestScore[0]}. Your interests in ${interests.join(", ")} suggest you value a career that allows for both personal fulfillment and professional development. You're likely to thrive in environments that acknowledge your strengths while providing opportunities to develop new skills.`;
}

function generateCareerMatches(
  scores: Record<string, number> = {},
  interests: string[] = []
): Array<{name: string, value: number}> {
  const careerOptions = [
    "Software Developer",
    "Marketing Specialist",
    "Financial Analyst",
    "Healthcare Provider",
    "Creative Designer",
    "Research Scientist"
  ];
  
  return careerOptions.map(career => {
    let matchScore = 50; // Base score
    
    // Adjust score based on aptitudes
    if (career === "Software Developer" && scores.analytical > 70) matchScore += 20;
    if (career === "Marketing Specialist" && scores.creative > 70) matchScore += 20;
    if (career === "Financial Analyst" && scores.numerical > 70) matchScore += 20;
    if (career === "Healthcare Provider" && scores.interpersonal > 70) matchScore += 20;
    if (career === "Creative Designer" && scores.creative > 70) matchScore += 20;
    if (career === "Research Scientist" && scores.analytical > 70) matchScore += 20;
    
    // Adjust score based on interests
    interests.forEach(interest => {
      if (career === "Software Developer" && interest.toLowerCase() === "technology") matchScore += 10;
      if (career === "Creative Designer" && interest.toLowerCase() === "arts") matchScore += 10;
      if (career === "Research Scientist" && interest.toLowerCase() === "science") matchScore += 10;
      if (career === "Healthcare Provider" && interest.toLowerCase() === "helping others") matchScore += 10;
    });
    
    // Normalize score to be between 30-100
    matchScore = Math.max(30, Math.min(100, matchScore));
    
    return {
      name: career,
      value: matchScore
    };
  });
}
