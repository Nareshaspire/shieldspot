// Mock Firebase Service
// Replace this with actual Firebase initialization and Firestore functions when config is available.
import { CaseStudy, Insight } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCaseStudies = async (): Promise<CaseStudy[]> => {
  await delay(800); // 800ms delay to simulate network
  return [];
};

export const fetchInsights = async (): Promise<Insight[]> => {
  await delay(600); // 600ms delay
  return [];
};
