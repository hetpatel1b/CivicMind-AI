export type CivicIssueCategory = 
  | 'Pothole'
  | 'Road Damage'
  | 'Garbage'
  | 'Water Leakage'
  | 'Broken Streetlight'
  | 'Drainage Issue'
  | 'Traffic Signal Issue'
  | 'Public Safety Issue'
  | 'Other';

export type CivicIssueSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type MunicipalDepartment = 
  | 'Road Maintenance'
  | 'Sanitation'
  | 'Water Department'
  | 'Electricity Department'
  | 'Traffic Department'
  | 'Municipal Corporation';

/**
 * The standard structure expected from Gemini 2.5 Flash analysis.
 */
export interface AIAnalysisResult {
  title: string;
  description: string;
  category: CivicIssueCategory;
  severity: CivicIssueSeverity;
  recommended_department: MunicipalDepartment;
  confidence: number;
}
