export type UserRole = 'user' | 'consultant' | 'dermatologist' | 'admin';

export type SkinType = 'Oily' | 'Dry' | 'Combination' | 'Sensitive' | 'Normal';

export interface SkinConcernScore {
  name: string;
  score: number; // 0 - 100 (higher means more severe concern)
  level: 'Optimal' | 'Mild' | 'Moderate' | 'Severe';
  description: string;
}

export interface AISkinScanResult {
  id: string;
  timestamp: string;
  overallScore: number; // 0 - 100
  skinType: SkinType;
  concerns: {
    acne: SkinConcernScore;
    hyperpigmentation: SkinConcernScore;
    wrinkles: SkinConcernScore;
    redness: SkinConcernScore;
    pores: SkinConcernScore;
  };
  moistureBarrier: number; // percentage 0 - 100
  sebumBalance: number; // percentage 0 - 100
  elasticity: number; // percentage 0 - 100
  recommendedActives: string[];
}

export interface RoutineItem {
  id: string;
  title: string;
  category: 'Cleanser' | 'Toner' | 'Serums & Actives' | 'Moisturizer' | 'Sunscreen' | 'Special Treatment';
  timeOfDay: 'AM' | 'PM' | 'Both';
  brand: string;
  activeIngredients: string[];
  instructions: string;
  completed: boolean;
  frequency: string;
}

export interface IngredientInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  pHRange: string;
  conflictsWith: string[];
  bestPairedWith: string[];
  safetyRating: 'High Compatibility' | 'Moderate Caution' | 'High Risk';
}

export interface ProductRecommendation {
  id: string;
  name: string;
  brand: string;
  category: string;
  matchScore: number; // percentage
  price: number;
  imageUrl: string;
  targetConcerns: string[];
  keyIngredients: string[];
  whyItWorks: string;
  rating: number;
  reviewsCount: number;
}

export interface ConsultationCase {
  id: string;
  patientName: string;
  patientAge: number;
  skinType: SkinType;
  lastScanScore: number;
  status: 'Pending Review' | 'Active Routine' | 'Prescription Issued' | 'Completed';
  primaryConcern: string;
  assignedDermatologist: string;
  notes: string[];
  dateAdded: string;
}

export interface ClinicalPrescription {
  id: string;
  caseId: string;
  patientName: string;
  dermatologistName: string;
  medication: string;
  dosage: string;
  duration: string;
  refills: number;
  clinicalInstructions: string;
  dateIssued: string;
}

export interface MicroserviceMetric {
  serviceName: string;
  type: 'FastAPI REST' | 'PostgreSQL' | 'MongoDB' | 'Redis Cache' | 'AWS S3' | 'TensorFlow CV';
  status: 'Healthy' | 'Degraded' | 'Offline';
  latencyMs: number;
  uptimePercentage: number;
  requestsPerSec: number;
  memoryUsage: string;
}

export interface WeatherData {
  city: string;
  temperatureC: number;
  uvIndex: number;
  humidity: number;
  airQuality: string;
  skinAdvice: string;
}
