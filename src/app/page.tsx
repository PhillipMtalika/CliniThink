'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import {
  Stethoscope,
  Loader2,
  Brain,
  AlertTriangle,
  Sparkles,
  BarChart3,
  BadgeCheck,
  Info,
  BookOpen,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const symptomFormSchema = z.object({
  symptoms: z.string().min(10, 'Please describe symptoms in detail (at least 10 characters)'),
});

type SymptomFormData = z.infer<typeof symptomFormSchema>;

type FillMaskResult = {
  sequence: string;
  score: number;
  token: number;
  token_str: string;
};

function countMaskTokens(text: string) {
  return (text.match(/\[MASK\]/g) || []).length;
}

export default function CliniThinkPage() {
  const [results, setResults] = useState<FillMaskResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [raw, setRaw] = useState<any>(null);
  const [maskError, setMaskError] = useState<string | null>(null);

  const form = useForm<SymptomFormData>({
    resolver: zodResolver(symptomFormSchema),
    defaultValues: {
      symptoms: '',
    },
  });

  // Watch the symptoms field for [MASK] validation
  const symptomsValue = form.watch('symptoms');
  const maskCount = countMaskTokens(symptomsValue);

  // Validate mask count
  let maskErrorMsg = null;
  if (symptomsValue.trim().length > 0) {
    if (maskCount === 0) maskErrorMsg = 'Input must contain exactly one [MASK] token.';
    else if (maskCount > 1) maskErrorMsg = 'Input must contain only one [MASK] token.';
  }

  const onSubmit = async (data: SymptomFormData) => {
    setIsLoading(true);
    setError(null);
    setResults([]);
    setRaw(null);
    try {
      const response = await axios.post('/api/diagnose', data);
      setResults(response.data.result);
      setRaw(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        'Failed to analyze symptoms. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">CliniThink</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2"><Sparkles className="h-5 w-5 text-blue-400" />AI-powered</span> symptom checker using <b>Bio_ClinicalBERT</b> for frontline health workers in Malawi
          </p>
        </div>

        {/* Model Explanation */}
        <Card className="mb-8 shadow-md">
          <CardHeader className="flex flex-row items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            <CardTitle className="text-lg">How does this work?</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 text-sm">
            <p>
              This tool uses <b>Bio_ClinicalBERT</b>, a state-of-the-art medical language model, to predict the most likely word or phrase that fits in the context of your symptom description. Enter a sentence with <span className="font-mono bg-gray-100 px-1 rounded">[MASK]</span> where you want the AI to suggest a medical term.<br />
              <span className="text-xs text-gray-500">Example: <span className="font-mono bg-gray-100 px-1 rounded">The patient has a persistent [MASK] and fever.</span></span>
            </p>
          </CardContent>
        </Card>

        {/* Symptom Input Form */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Enter Symptoms
            </CardTitle>
            <CardDescription>
              Describe the patient's symptoms and use <span className="font-mono bg-gray-100 px-1 rounded">[MASK]</span> for the AI to fill in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symptoms Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. The patient has a persistent [MASK] and fever."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Use <span className="font-mono bg-gray-100 px-1 rounded">[MASK]</span> to let the AI suggest a medical term.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {maskErrorMsg && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{maskErrorMsg}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading || !!maskErrorMsg}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing with Bio_ClinicalBERT...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Analyze Symptoms
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results Display */}
        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {results.length > 0 && (
            <Card className="shadow-md">
              <CardHeader className="flex flex-row items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Top AI Predictions</CardTitle>
                <BadgeCheck className="ml-2 h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.slice(0, 5).map((res, idx) => (
                    <Card key={idx} className="border border-gray-200 shadow-sm hover:shadow-lg transition">
                      <CardHeader className="flex flex-row items-center gap-2 pb-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-mono text-base px-2 py-1">
                          {res.token_str}
                        </Badge>
                        <span className="text-xs text-gray-500">Prediction #{idx + 1}</span>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="mb-2 text-gray-700 text-sm">
                          <span className="font-semibold">Completed:</span> <span className="font-mono bg-gray-50 px-1 rounded">{res.sequence}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Confidence:</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-2 bg-green-500 rounded-full"
                              style={{ width: `${Math.round(res.score * 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-mono text-green-700 ml-2">{(res.score * 100).toFixed(1)}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Powered by Bio_ClinicalBERT (Hugging Face). The model predicts the most likely word or phrase for the [MASK] in your input.
                </div>
              </CardContent>
            </Card>
          )}

          {!results.length && !isLoading && !error && (
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <div className="text-center text-gray-500">
                  <Stethoscope className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Enter patient symptoms with <span className="font-mono bg-gray-100 px-1 rounded">[MASK]</span> to get AI-powered predictions.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-500">
          <p>
            CliniThink is designed to support healthcare workers in Malawi.<br />
            This tool provides suggestions only and should not replace professional medical judgment.
          </p>
        </div>
      </div>
    </div>
  );
}
