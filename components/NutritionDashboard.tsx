
import React from 'react';
import { NutritionAnalysis } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface Props {
  data: NutritionAnalysis;
  weight: number;
}

const NutritionDashboard: React.FC<Props> = ({ data, weight }) => {
  const { macros, proteinAnalysis, summary, suggestions, timingAdvice, hydrationAdvice } = data;

  const macroData = [
    { name: 'Protein', value: macros.protein * 4, color: '#10b981' },
    { name: 'Carbs', value: macros.carbs * 4, color: '#3b82f6' },
    { name: 'Fats', value: macros.fats * 9, color: '#f59e0b' },
  ];

  const proteinComparison = [
    { name: 'Actual', value: proteinAnalysis.actual },
    { name: 'Min Target', value: weight * 1.6 },
    { name: 'Max Target', value: weight * 2.2 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'low': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'high': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'excessive': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Calories</div>
          <div className="text-2xl font-bold text-slate-900">{Math.round(macros.calories)} <span className="text-sm font-normal text-slate-400">kcal</span></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
          <div className="text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-1">Protein</div>
          <div className="text-2xl font-bold text-slate-900">{Math.round(macros.protein)} <span className="text-sm font-normal text-slate-400">g</span></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
          <div className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">Carbs</div>
          <div className="text-2xl font-bold text-slate-900">{Math.round(macros.carbs)} <span className="text-sm font-normal text-slate-400">g</span></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-amber-500">
          <div className="text-amber-600 text-xs font-semibold uppercase tracking-wider mb-1">Fats</div>
          <div className="text-2xl font-bold text-slate-900">{Math.round(macros.fats)} <span className="text-sm font-normal text-slate-400">g</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Macro Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
            <i className="fa-solid fa-chart-pie text-emerald-500 mr-2"></i>
            Caloric Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 text-sm font-medium">
            {macroData.map(item => (
              <div key={item.name} className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Protein Benchmarking */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
            <i className="fa-solid fa-gauge-high text-emerald-500 mr-2"></i>
            Muscle Gain Protein Benchmark
          </h3>
          <p className="text-sm text-slate-500 mb-6 italic">Target: 1.6g - 2.2g per kg of bodyweight ({weight}kg)</p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={proteinComparison} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {proteinComparison.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`mt-4 px-4 py-3 rounded-xl border text-center ${getStatusColor(proteinAnalysis.status)}`}>
            <span className="font-bold uppercase text-xs tracking-widest mr-2">Status: {proteinAnalysis.status}</span>
            <span className="text-sm">Range: {proteinAnalysis.range}</span>
          </div>
        </div>
      </div>

      {/* Summary & Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Strategic Nutrition Analysis</h3>
            <p className="text-slate-600 leading-relaxed mb-6">{summary}</p>
            
            <h4 className="font-bold text-slate-900 mb-3 flex items-center">
              <i className="fa-solid fa-clipboard-list text-emerald-500 mr-2"></i>
              Actionable Suggestions
            </h4>
            <ul className="space-y-3">
              {suggestions.map((s, i) => (
                <li key={i} className="flex items-start space-x-3 text-slate-600">
                  <span className="bg-emerald-100 text-emerald-600 rounded-full p-1 text-[10px] mt-1 shrink-0">
                    <i className="fa-solid fa-check"></i>
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold mb-4 flex items-center">
              <i className="fa-solid fa-clock text-emerald-400 mr-2"></i>
              Anabolic Timing
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              {timingAdvice}
            </p>
          </div>

          <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold mb-4 flex items-center">
              <i className="fa-solid fa-droplet text-blue-400 mr-2"></i>
              Hydration Protocol
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              {hydrationAdvice}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-slate-100 p-4 rounded-xl text-slate-500 text-xs text-center border border-slate-200">
        <p><strong>Disclaimer:</strong> This tool provides nutritional estimations for informational purposes only. It is not a medical diagnosis or a substitute for professional medical advice. Always consult with a healthcare professional before making significant changes to your diet or exercise routine.</p>
      </div>
    </div>
  );
};

export default NutritionDashboard;
