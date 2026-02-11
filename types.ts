
export interface Macros {
  protein: number;
  calories: number;
  carbs: number;
  fats: number;
}

export interface NutritionAnalysis {
  macros: Macros;
  summary: string;
  proteinAnalysis: {
    status: 'low' | 'optimal' | 'high' | 'excessive';
    range: string;
    actual: number;
    difference: number;
  };
  suggestions: string[];
  timingAdvice: string;
  hydrationAdvice: string;
}

export interface UserProfile {
  bodyWeight: number; // in kg
  goal: string;
}
