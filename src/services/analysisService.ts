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
    
    const careerRecommendations = await generateCareerRecommendations(openai, testResults);
    
    // Only proceed if we got valid recommendations
    if (!careerRecommendations || careerRecommendations.includes("No se pudieron generar recomendaciones")) {
      throw new Error("Error al generar las recomendaciones de carrera");
    }
    
    // Mock data for all sections with matching field names
    const mockData = {
      aptitudeScores: [
        { name: "Analítico", value: 85 },
        { name: "Creativo", value: 92 },
        { name: "Interpersonal", value: 78 },
        { name: "Práctico", value: 65 },
        { name: "Verbal", value: 88 },
        { name: "Numérico", value: 72 }
      ],
      careerMatches: [
        { name: "Psicología", value: 95 },
        { name: "Terapia Ocupacional", value: 90 },
        { name: "Trabajo Social", value: 85 },
        { name: "Educación Especial", value: 80 },
        { name: "Recursos Humanos", value: 75 }
      ],
      strengths: [
        "Empatía y comprensión hacia los demás",
        "Capacidad de análisis y resolución de problemas",
        "Comunicación efectiva",
        "Trabajo en equipo",
        "Adaptabilidad al cambio"
      ],
      areasOfGrowth: [
        "Gestión del tiempo",
        "Toma de decisiones bajo presión",
        "Liderazgo",
        "Asertividad",
        "Resiliencia"
      ],
      personalityInsights: [
        {
          name: "Calidez",
          score: 85,
          description: "Alta capacidad para relacionarse con otros y mostrar empatía"
        },
        {
          name: "Razonamiento",
          score: 92,
          description: "Excelente capacidad de análisis y resolución de problemas"
        },
        {
          name: "Estabilidad Emocional",
          score: 78,
          description: "Buena capacidad para manejar situaciones estresantes"
        }
      ]
    };
    
    return {
      careerRecommendations,
      summary: "Análisis completo de tus resultados",
      ...mockData
    };
  } catch (error) {
    console.error('Error in analyzeTestResults:', error);
    // Throw a more user-friendly error message
    throw new Error("Lo sentimos, hubo un error al procesar tus resultados. Por favor, verifica tu clave API y vuelve a intentarlo.");
  }
};

const generateCareerRecommendations = async (openai: OpenAI, testResults: any) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: `Eres un psicólogo virtual especializado en analizar resultados de tests psicológicos.
Tu tarea es examinar en profundidad la información obtenida a partir de diferentes
evaluaciones realizadas por el usuario, que incluyen el Test 16PF, una autoevaluación
y una contextualización. Con base en esta información, debes generar un informe
personalizado que detalle las fortalezas del usuario, identifique sus áreas de
oportunidad y ofrezca recomendaciones prácticas para su desarrollo personal y
profesional. Tu respuesta debe ser clara, empática y orientada a brindar sugerencias
útiles y accionables.`
        },
        {
          role: "user",
          content: `Analiza estos resultados y proporciona un informe detallado:
          ${JSON.stringify(testResults, null, 2)}`
        }
      ],
      max_tokens: 1000
    });

    if (!response.choices?.[0]?.message?.content) {
      throw new Error("No se recibió respuesta del servicio de análisis");
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating career recommendations:', error);
    throw error; // Propagate the error to be handled by the parent function
  }
};

export default {
  analyzeTestResults
};
