
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import DietForm from './components/DietForm';
import NutritionDashboard from './components/NutritionDashboard';
import { analyzeDiet } from './services/geminiService';
import { NutritionAnalysis } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<NutritionAnalysis | null>(null);
  const [currentWeight, setCurrentWeight] = useState(70);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (foodItems: string, weight: number) => {
    setLoading(true);
    setError(null);
    setCurrentWeight(weight);
    try {
      const result = await analyzeDiet(foodItems, weight);
      setAnalysis(result);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError("Failed to analyze diet. Please check your food list and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      <Header />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 md:py-12 w-full">
        <section className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Optimize Your Diet for <span className="text-emerald-600">Muscle Growth</span>.
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Upload your daily food diary and get a professional breakdown of your macro targets, protein quality, and strategic timing for maximum hypertrophy.
          </p>
        </section>

        <DietForm onAnalyze={handleAnalyze} loading={loading} />

        {error && (
          <div className="mt-8 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center space-x-3">
            <i className="fa-solid fa-circle-exclamation text-xl"></i>
            <span>{error}</span>
          </div>
        )}

        <div id="results-section" className="mt-16">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900">Calculating Macros...</h3>
                <p className="text-slate-500">Our nutritionist AI is analyzing your intake data.</p>
              </div>
            </div>
          ) : analysis ? (
            <NutritionDashboard data={analysis} weight={currentWeight} />
          ) : (
            <div className="py-24 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center px-4">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <i className="fa-solid fa-utensils text-slate-300 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-400">Your Analysis Will Appear Here</h3>
              <p className="text-slate-400 max-w-sm mt-2">Enter your daily meals above to see a detailed breakdown of your muscle-building potential.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="bg-slate-800 p-1.5 rounded-lg">
                <i className="fa-solid fa-dumbbell text-white text-sm"></i>
              </div>
              <span className="text-lg font-bold text-slate-900">GainTrack AI</span>
            </div>
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} GainTrack AI. Built for athletes.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">
                <i className="fa-brands fa-x-twitter text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">
                <i className="fa-brands fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
