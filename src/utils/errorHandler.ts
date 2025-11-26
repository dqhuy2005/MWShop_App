/**
 * Error Handler
 * Utilities for handling and formatting errors
 */

import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { STRINGS } from '../constants/strings';

/**
 * Error message mapping
 */
const ERROR_MESSAGES: Record<string, string> = {
  NETWORK_ERROR: STRINGS.errors.network,
  SERVER_ERROR: STRINGS.errors.server,
  UNAUTHORIZED: STRINGS.errors.unauthorized,
  FORBIDDEN: STRINGS.errors.forbidden,
  NOT_FOUND: STRINGS.errors.notFound,
  VALIDATION_ERROR: STRINGS.errors.validation,
  UNKNOWN_ERROR: STRINGS.errors.unknown,
};

/**
 * Get user-friendly error message
 * @param {any} error - Error object
 * @returns {string} Formatted error message
 */
export const getErrorMessage = (error: any): string => {
  // Network error
  if (!error.response) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  const status = error.response?.status;
  const message = error.response?.data?.message;

  // Use API message if available
  if (message && typeof message === 'string') {
    return message;
  }

  // Map status codes to messages
  switch (status) {
    case 400:
      return ERROR_MESSAGES.VALIDATION_ERROR;
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 404:
      return ERROR_MESSAGES.NOT_FOUND;
    case 500:
    case 502:
    case 503:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

/**
 * Log error in development
 * @param {AxiosError} error - Axios error object
 */
export const logError = (error: AxiosError): void => {
  if (!__DEV__) return;

  console.group('❌ API Error');
  console.error('Message:', error.message);
  console.error('Status:', error.response?.status);
  console.error('URL:', error.config?.url);
  console.error('Method:', error.config?.method?.toUpperCase());
  console.error('Data:', error.response?.data);
  console.groupEnd();
};

/**
 * Log request in development
 * @param {InternalAxiosRequestConfig} config - Request config
 */
export const logRequest = (config: InternalAxiosRequestConfig): void => {
  if (!__DEV__) return;

  console.group('📡 API Request');
  console.log('URL:', config.url);
  console.log('Method:', config.method?.toUpperCase());
  console.log('Params:', config.params);
  console.log('Data:', config.data);
  console.groupEnd();
};

/**
 * Log response in development
 * @param {AxiosResponse} response - Response object
 */
export const logResponse = (response: AxiosResponse): void => {
  if (!__DEV__) return;

  console.group('✅ API Response');
  console.log('URL:', response.config.url);
  console.log('Status:', response.status);
  console.log('Data:', response.data);
  console.groupEnd();
};

/**
 * Handle error and return formatted message
 * @param {any} error - Error object
 * @param {string} fallbackMessage - Fallback message if error cannot be parsed
 * @returns {string} Formatted error message
 */
export const handleError = (error: any, fallbackMessage?: string): string => {
  const errorMessage = getErrorMessage(error);
  
  if (__DEV__) {
    logError(error);
  }
  
  return errorMessage || fallbackMessage || ERROR_MESSAGES.UNKNOWN_ERROR;
};

export default {
  getErrorMessage,
  logError,
  logRequest,
  logResponse,
  handleError,
};
