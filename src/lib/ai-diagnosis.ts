// Enhanced AI Diagnosis System - Simulates Bio_ClinicalBERT Analysis
// This can be replaced with actual Hugging Face API calls when Python backend is available

export interface DiagnosisResult {
  condition: string;
  confidence: number;
  urgency: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

// Medical conditions database with comprehensive symptom mappings
const MEDICAL_CONDITIONS = {
  malaria: {
    keywords: ['fever', 'chills', 'headache', 'muscle pain', 'fatigue', 'sweating', 'nausea', 'vomiting', 'diarrhea'],
    severity_keywords: ['high fever', 'severe headache', 'intense chills', 'extreme fatigue'],
    urgency: 'high' as const,
    description: 'Serious parasitic disease transmitted by mosquitoes, common in tropical regions including Malawi',
    recommendations: [
      'Seek immediate medical attention',
      'Get tested for malaria (blood test)',
      'Start antimalarial treatment if confirmed',
      'Monitor for severe symptoms like confusion or seizures',
      'Prevent future infections with mosquito nets and repellents'
    ]
  },
  upper_respiratory_infection: {
    keywords: ['cough', 'cold', 'sore throat', 'runny nose', 'congestion', 'sneezing', 'mild fever', 'hoarse voice'],
    severity_keywords: ['severe cough', 'high fever', 'difficulty breathing'],
    urgency: 'low' as const,
    description: 'Common viral infection affecting the upper respiratory tract',
    recommendations: [
      'Rest and stay hydrated',
      'Take over-the-counter pain relievers if needed',
      'Use saline nasal sprays for congestion',
      'Monitor for worsening symptoms',
      'Seek medical attention if symptoms persist beyond 10 days'
    ]
  },
  gastroenteritis: {
    keywords: ['diarrhea', 'vomiting', 'nausea', 'stomach pain', 'dehydration', 'abdominal cramps', 'loss of appetite'],
    severity_keywords: ['severe diarrhea', 'blood in stool', 'severe dehydration', 'high fever'],
    urgency: 'medium' as const,
    description: 'Inflammation of the stomach and intestines, often caused by viral or bacterial infection',
    recommendations: [
      'Stay hydrated with oral rehydration solutions',
      'Eat bland foods (BRAT diet: bananas, rice, applesauce, toast)',
      'Rest and avoid dairy products',
      'Seek medical care if dehydration occurs',
      'Practice good hand hygiene to prevent spread'
    ]
  },
  hypertension: {
    keywords: ['high blood pressure', 'headache', 'dizziness', 'chest pain', 'shortness of breath', 'vision problems'],
    severity_keywords: ['severe headache', 'chest pain', 'shortness of breath', 'vision changes'],
    urgency: 'high' as const,
    description: 'Elevated blood pressure that can lead to serious health complications',
    recommendations: [
      'Seek immediate medical evaluation',
      'Monitor blood pressure regularly',
      'Reduce salt intake and follow DASH diet',
      'Exercise regularly and maintain healthy weight',
      'Take prescribed medications as directed'
    ]
  },
  diabetes: {
    keywords: ['frequent urination', 'excessive thirst', 'fatigue', 'blurred vision', 'slow healing', 'weight loss'],
    severity_keywords: ['severe fatigue', 'blurred vision', 'rapid weight loss', 'frequent infections'],
    urgency: 'medium' as const,
    description: 'Metabolic disorder affecting blood sugar regulation',
    recommendations: [
      'Seek medical evaluation for proper diagnosis',
      'Monitor blood glucose levels',
      'Follow a balanced diet low in refined sugars',
      'Exercise regularly',
      'Take prescribed medications as directed'
    ]
  },
  pneumonia: {
    keywords: ['cough', 'fever', 'difficulty breathing', 'chest pain', 'fatigue', 'sputum', 'shortness of breath'],
    severity_keywords: ['severe cough', 'high fever', 'difficulty breathing', 'chest pain'],
    urgency: 'high' as const,
    description: 'Serious lung infection that can be life-threatening',
    recommendations: [
      'Seek immediate medical attention',
      'Get chest X-ray for diagnosis',
      'Take prescribed antibiotics if bacterial',
      'Rest and stay hydrated',
      'Monitor oxygen levels'
    ]
  },
  typhoid_fever: {
    keywords: ['fever', 'headache', 'abdominal pain', 'diarrhea', 'constipation', 'rash', 'weakness'],
    severity_keywords: ['high fever', 'severe abdominal pain', 'blood in stool'],
    urgency: 'high' as const,
    description: 'Bacterial infection caused by Salmonella typhi, common in areas with poor sanitation',
    recommendations: [
      'Seek immediate medical attention',
      'Get blood and stool tests for diagnosis',
      'Start antibiotic treatment if confirmed',
      'Ensure proper hydration',
      'Practice good hygiene and food safety'
    ]
  },
  tuberculosis: {
    keywords: ['cough', 'fever', 'night sweats', 'weight loss', 'fatigue', 'chest pain', 'blood in sputum'],
    severity_keywords: ['persistent cough', 'blood in sputum', 'severe weight loss'],
    urgency: 'high' as const,
    description: 'Serious bacterial infection affecting the lungs, requires immediate treatment',
    recommendations: [
      'Seek immediate medical attention',
      'Get chest X-ray and sputum tests',
      'Start anti-tuberculosis treatment if confirmed',
      'Complete full course of treatment',
      'Isolate to prevent spread to others'
    ]
  }
};

// Simulate AI feature extraction (simulates Bio_ClinicalBERT embeddings)
function extractAIFeatures(symptoms: string): number[] {
  const words = symptoms.toLowerCase().split(/\s+/);
  const features = new Array(768).fill(0); // Simulate BERT embedding size
  
  // Simple feature extraction based on word presence and frequency
  words.forEach((word, index) => {
    const hash = word.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const featureIndex = hash % 768;
    features[featureIndex] += 1 / (index + 1); // Weight by position
  });
  
  return features;
}

// Calculate semantic similarity between symptoms and condition keywords
function calculateSemanticSimilarity(symptoms: string, keywords: string[]): number {
  const symptomWords = new Set(symptoms.toLowerCase().split(/\s+/));
  const keywordWords = new Set(keywords.flatMap(k => k.split(/\s+/)));
  
  const intersection = new Set([...symptomWords].filter(x => keywordWords.has(x)));
  const union = new Set([...symptomWords, ...keywordWords]);
  
  return intersection.size / union.size;
}

// Enhanced symptom analysis with AI simulation
export function analyzeSymptomsWithAI(symptoms: string): DiagnosisResult[] {
  const symptomLower = symptoms.toLowerCase();
  const results: DiagnosisResult[] = [];
  
  // Extract AI features (simulates Bio_ClinicalBERT)
  const aiFeatures = extractAIFeatures(symptoms);
  const aiConfidence = Math.min(0.9, Math.max(0.1, aiFeatures.reduce((a, b) => a + b, 0) / aiFeatures.length));
  
  for (const [conditionKey, info] of Object.entries(MEDICAL_CONDITIONS)) {
    // Calculate keyword matching score
    const keywordMatches = info.keywords.filter(keyword => symptomLower.includes(keyword)).length;
    const severityMatches = info.severity_keywords.filter(keyword => symptomLower.includes(keyword)).length;
    
    if (keywordMatches > 0) {
      // Base confidence from keyword matching
      const baseConfidence = Math.min(1.0, keywordMatches / info.keywords.length);
      
      // Boost confidence for severity keywords
      const severityBoost = severityMatches * 0.2;
      
      // Calculate semantic similarity
      const semanticSimilarity = calculateSemanticSimilarity(symptoms, info.keywords);
      
      // Combine all factors for final confidence
      const finalConfidence = Math.min(0.95, 
        (baseConfidence * 0.5) + 
        (semanticSimilarity * 0.3) + 
        (aiConfidence * 0.2) + 
        severityBoost
      );
      
      // Format condition name
      const conditionName = conditionKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      results.push({
        condition: conditionName,
        confidence: Math.round(finalConfidence * 1000) / 1000,
        urgency: info.urgency,
        description: info.description,
        recommendations: info.recommendations
      });
    }
  }
  
  // Sort by confidence and return top 3
  results.sort((a, b) => b.confidence - a.confidence);
  
  // If no specific conditions found, return general consultation
  if (results.length === 0) {
    results.push({
      condition: "General Consultation Recommended",
      confidence: 0.5,
      urgency: "medium",
      description: "Unable to provide specific diagnosis. Please consult a healthcare professional for proper evaluation.",
      recommendations: [
        "Schedule an appointment with a healthcare provider",
        "Bring detailed symptom history and timeline",
        "Consider any recent travel, exposure, or medication changes",
        "Monitor symptoms and seek emergency care if they worsen",
        "Keep a symptom diary to track patterns"
      ]
    });
  }
  
  return results.slice(0, 3);
}

// Get available conditions for reference
export function getAvailableConditions(): string[] {
  return Object.keys(MEDICAL_CONDITIONS).map(key => 
    key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  );
} 