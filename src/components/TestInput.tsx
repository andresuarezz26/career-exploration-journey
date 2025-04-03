import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { analyzeTestResults } from '@/services/analysisService';
import { Input } from '@/components/ui/input';

interface TestInputProps {
  onAnalysisComplete: (analysisData: any) => void;
  setIsLoading: (loading: boolean) => void;
}

const TestInput: React.FC<TestInputProps> = ({ onAnalysisComplete, setIsLoading }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      
      if (!apiKey.trim()) {
        toast({
          title: "Clave API Requerida",
          description: "Por favor, ingresa tu clave API de OpenAI",
          variant: "destructive"
        });
        return;
      }
      
      setIsLoading(true);
      const analysisResult = await analyzeTestResults(parsedJson, apiKey);
      onAnalysisComplete(analysisResult);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Formato de JSON inválido",
        description: "Por favor, verifica tu entrada y inténtalo de nuevo",
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
        title: "Contenido pegado",
        description: "Los resultados de la prueba han sido pegados desde el portapapeles",
      });
    } catch (error) {
      toast({
        title: "No se puede acceder al portapapeles",
        description: "Por favor, pega el contenido manualmente",
        variant: "destructive"
      });
    }
  };

  const exampleJson = JSON.stringify({
    "test_name": "Prueba de Personalidad 16PF",
    "version": "5ª Edición",
    "person": {
      "name": "Juan Pérez",
      "whatsapp": "+34 600 123 456"
    },
    "questions": [
      {
        "id": 1,
        "trait": "Calidez",
        "question_text": "Disfruto socializar y conocer gente nueva.",
        "score": 3,
        "scale": "Neutral"
      },
      {
        "id": 2,
        "trait": "Razonamiento",
        "question_text": "Disfruto resolver problemas complejos y acertijos.",
        "score": 4,
        "scale": "De acuerdo"
      },
      {
        "id": 3,
        "trait": "Estabilidad Emocional",
        "question_text": "Permanezco tranquilo y sereno bajo presión.",
        "score": 5,
        "scale": "Totalmente de acuerdo"
      }
    ],
    "scoring_method": "Cada respuesta se puntúa de 1 a 5. La suma de las respuestas de cada rasgo determina la puntuación del factor de personalidad.",
    "traits": [
      "Calidez",
      "Razonamiento",
      "Estabilidad Emocional",
      "Dominancia",
      "Vivacidad",
      "Conciencia Normativa",
      "Audacia Social",
      "Sensibilidad",
      "Vigilancia",
      "Abstracción",
      "Privacidad",
      "Aprensión",
      "Apertura al Cambio",
      "Autosuficiencia",
      "Perfeccionismo",
      "Tensión"
    ]
  }, null, 2);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pegar Resultados de Prueba</CardTitle>
        <CardDescription>
          Pega los resultados de la prueba psicológica en formato JSON a continuación para obtener tu análisis de carrera
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="api-key" className="block text-sm font-medium mb-1">Clave API de OpenAI</label>
          <Input
            id="api-key"
            type="password"
            placeholder="Ingresa tu clave API de OpenAI"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Tu clave API se usa localmente y nunca se almacena en nuestros servidores
          </p>
        </div>
        
        <div>
          <Textarea
            placeholder="Pega aquí tus resultados de prueba en JSON..."
            className="min-h-[200px] font-mono text-sm"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setJsonInput(exampleJson)}
            className="text-xs"
          >
            Cargar Ejemplo
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePaste}
            className="text-xs"
          >
            Pegar desde Portapapeles
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-gradient-to-r from-explora-primary to-explora-secondary hover:opacity-90"
        >
          Analizar Resultados
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestInput;
