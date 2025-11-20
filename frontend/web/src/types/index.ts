/**
 * Shared TypeScript Types for SurvAi Frontend
 */

export type UUID = string;

// Authentication Types
export interface User {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
  language: string;
  timezone: string;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  language?: string;
  timezone?: string;
}

// Survey Types
export type QuestionType =
  | 'text'
  | 'radio'
  | 'checkbox'
  | 'rating'
  | 'nps'
  | 'ranking'
  | 'matrix'
  | 'date'
  | 'time'
  | 'email'
  | 'phone'
  | 'file';

export type SurveyStatus = 'draft' | 'published' | 'closed' | 'archived';

export interface Question {
  id: UUID;
  surveyId: UUID;
  order: number;
  type: QuestionType;
  text: string;
  description?: string;
  required: boolean;
  options: string[];
  validation?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Survey {
  id: UUID;
  userId: UUID;
  title: string;
  description?: string;
  questions: Question[];
  aiConfig: Record<string, any>;
  status: SurveyStatus;
  shareSettings: Record<string, any>;
  theme: string;
  language: string;
  responsesCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  closedAt?: string;
}

export interface SurveyCreateRequest {
  title: string;
  description?: string;
  language?: string;
  theme?: string;
  questions?: Partial<Question>[];
}

export interface SurveyResponse {
  id: UUID;
  surveyId: UUID;
  respondentId?: UUID;
  answers: Record<string, any>;
  aiAnalysis?: Record<string, any>;
  completionTime?: number;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface SurveyResponseCreateRequest {
  answers: Record<string, any>;
  completionTime?: number;
}

// Analytics Types
export interface SentimentAnalysis {
  polarity: 'positive' | 'neutral' | 'negative';
  confidence: number;
  emotions: string[];
  keyPhrases: string[];
  language: string;
}

export interface QuestionStats {
  questionId: UUID;
  text: string;
  type: QuestionType;
  totalResponses: number;
  responseDistribution: Record<string, number>;
  averageRating?: number;
}

export interface SurveyAnalytics {
  surveyId: UUID;
  responseCount: number;
  completionRate: number;
  averageCompletionTime: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  questionAnalytics: QuestionStats[];
  trends: Array<{
    date: string;
    responseCount: number;
  }>;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  detail: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Share Types
export type ShareType = 'link' | 'email' | 'qr' | 'embed';

export interface ShareSettings {
  type: ShareType;
  enabled: boolean;
  expiresAt?: string;
  password?: string;
  allowDuplicate: boolean;
  showProgressBar: boolean;
  allowAnonymous: boolean;
}

// AI Types
export interface AIConfig {
  generationMethod: 'manual' | 'ai';
  prompt?: string;
  intent?: string;
  estimatedTime?: number;
  sentimentAnalysis: boolean;
  knowledgeAssessment: boolean;
  autoInsights: boolean;
  realTimeAnalytics: boolean;
}

export interface AIGenerationRequest {
  prompt: string;
  language: string;
  context?: Record<string, any>;
  templateId?: UUID;
}

export interface AIGenerationResponse {
  survey: Survey;
  generationTime: number;
  confidenceScore: number;
  suggestions: string[];
}
