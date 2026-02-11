
import React, { useState } from 'react';

interface DietFormProps {
  onAnalyze: (foodItems: string, weight: number) => void;
  loading: boolean;
}

const DietForm: React.FC<DietFormProps> = ({ onAnalyze, loading }) => {
  const [foodItems, setFoodItems] = useState('');
  const [weight, setWeight] = useState<number>(70);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (foodItems.trim()) {
      onAnalyze(foodItems, weight);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
          <i className="fa-solid fa-plate-wheat text-emerald-500 mr-2"></i>
          Analyze Your Daily Intake
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Body Weight (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="70"
                />
                <i className="fa-solid fa-weight-scale absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              </div>
              <p className="mt-2 text-xs text-slate-500 italic">Determines your protein requirement.</p>
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Today's Meals & Quantities
              </label>
              <textarea
                value={foodItems}
                onChange={(e) => setFoodItems(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                placeholder="Example: &#10;Breakfast: 3 scrambled eggs, 100g oats with milk&#10;Lunch: 200g grilled chicken breast, 1 cup brown rice&#10;Dinner: 150g Salmon, mixed greens..."
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !foodItems}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                loading || !foodItems 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-md hover:shadow-lg shadow-emerald-200'
              }`}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-chart-simple"></i>
                  <span>Analyze Muscle Gain Potential</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="bg-slate-50 border-t border-slate-100 px-8 py-4">
        <div className="flex items-start space-x-3">
          <i className="fa-solid fa-circle-info text-slate-400 mt-0.5"></i>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Pro Tip:</strong> Be as specific as possible with weights (g/oz) and cooking methods (grilled, fried, boiled) for the most accurate caloric estimation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DietForm;
