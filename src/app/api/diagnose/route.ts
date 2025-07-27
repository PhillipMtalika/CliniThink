import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface SymptomInput {
  symptoms: string;
  patientAge?: number;
  patientGender?: string;
  duration?: string;
}

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const body: SymptomInput = await request.json();
    const { symptoms } = body;

    if (!symptoms || symptoms.trim().length === 0) {
      return NextResponse.json(
        { error: 'Symptoms are required' },
        { status: 400 }
      );
    }

    // Send symptoms to the FastAPI backend for real model inference
    const response = await axios.post(`${PYTHON_BACKEND_URL}/analyze`, {
      symptoms: symptoms
    });

    // The backend returns a list of fill-mask results
    return NextResponse.json({
      success: true,
      result: response.data,
      timestamp: new Date().toISOString(),
      note: 'Powered by Bio_ClinicalBERT (Hugging Face)'
    });
  } catch (error: any) {
    console.error('Diagnosis API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze symptoms', details: error.message },
      { status: 500 }
    );
  }
} 