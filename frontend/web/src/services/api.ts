/**
 * API Service - Axios instance and API calls
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type { ApiError, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

/**
 * Create Axios instance with default config
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

/**
 * Request interceptor - Add authentication token
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handle errors
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - try to refresh token
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          const { accessToken } = response.data;
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', accessToken);
          }
          // Retry original request
          if (error.config) {
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return apiClient(error.config);
          }
        } catch {
          // Refresh failed, redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/auth/login';
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Authentication API calls
 */
export const authApi = {
  register: (data: any) => apiClient.post('/auth/register', data),
  login: (data: any) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  refresh: (refreshToken: string) => apiClient.post('/auth/refresh', { refreshToken }),
  verifyEmail: (token: string) => apiClient.post('/auth/verify-email', { token }),
  forgotPassword: (email: string) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    apiClient.post('/auth/reset-password', { token, password }),
};

/**
 * Surveys API calls
 */
export const surveysApi = {
  getAll: (params?: any) => apiClient.get('/surveys', { params }),
  getOne: (surveyId: string) => apiClient.get(`/surveys/${surveyId}`),
  create: (data: any) => apiClient.post('/surveys', data),
  update: (surveyId: string, data: any) => apiClient.put(`/surveys/${surveyId}`, data),
  delete: (surveyId: string) => apiClient.delete(`/surveys/${surveyId}`),
  publish: (surveyId: string) => apiClient.post(`/surveys/${surveyId}/publish`),
  close: (surveyId: string) => apiClient.post(`/surveys/${surveyId}/close`),
  getDraft: (surveyId: string) => apiClient.post(`/surveys/${surveyId}/draft`),
  archive: (surveyId: string) => apiClient.post(`/surveys/${surveyId}/archive`),
};

/**
 * Questions API calls
 */
export const questionsApi = {
  create: (surveyId: string, data: any) =>
    apiClient.post(`/surveys/${surveyId}/questions`, data),
  update: (surveyId: string, questionId: string, data: any) =>
    apiClient.put(`/surveys/${surveyId}/questions/${questionId}`, data),
  delete: (surveyId: string, questionId: string) =>
    apiClient.delete(`/surveys/${surveyId}/questions/${questionId}`),
};

/**
 * Responses API calls
 */
export const responsesApi = {
  getForm: (surveyId: string) => apiClient.get(`/surveys/${surveyId}/form`),
  submitResponse: (surveyId: string, data: any) =>
    apiClient.post(`/surveys/${surveyId}/responses`, data),
  getUserResponses: (surveyId: string) => apiClient.get(`/surveys/${surveyId}/responses`),
  getResponseDetail: (surveyId: string, responseId: string) =>
    apiClient.get(`/surveys/${surveyId}/responses/${responseId}`),
};

/**
 * Analytics API calls
 */
export const analyticsApi = {
  getAnalytics: (surveyId: string) => apiClient.get(`/surveys/${surveyId}/analytics`),
  getSentimentAnalysis: (surveyId: string) =>
    apiClient.get(`/surveys/${surveyId}/sentiment`),
  getKnowledgeAssessment: (surveyId: string) =>
    apiClient.get(`/surveys/${surveyId}/knowledge-assessment`),
  exportReport: (surveyId: string, format: 'pdf' | 'csv') =>
    apiClient.get(`/surveys/${surveyId}/export`, { params: { format } }),
};

/**
 * AI API calls
 */
export const aiApi = {
  generateSurvey: (data: any) => apiClient.post('/surveys/generate', data),
  improveQuestions: (data: any) => apiClient.post('/surveys/improve-questions', data),
  generateInsights: (surveyId: string) =>
    apiClient.post(`/surveys/${surveyId}/generate-insights`),
};

/**
 * Sharing API calls
 */
export const sharingApi = {
  generateShareLink: (surveyId: string) =>
    apiClient.post(`/surveys/${surveyId}/share`),
  getShareSettings: (surveyId: string) =>
    apiClient.get(`/surveys/${surveyId}/share-settings`),
  updateShareSettings: (surveyId: string, data: any) =>
    apiClient.put(`/surveys/${surveyId}/share-settings`, data),
  sendEmail: (surveyId: string, emails: string[]) =>
    apiClient.post(`/surveys/${surveyId}/send-email`, { emails }),
};

/**
 * User API calls
 */
export const userApi = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data: any) => apiClient.put('/users/profile', data),
  changePassword: (data: any) => apiClient.post('/users/change-password', data),
  exportData: () => apiClient.get('/users/export-data'),
  deleteAccount: () => apiClient.delete('/users/account'),
};

export default apiClient;
