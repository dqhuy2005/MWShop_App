/**
 * Src Index
 * Main export file for the src directory
 * 
 * This file provides a centralized export point for all modules in the src directory.
 * Import from here for better organization and maintainability.
 */

// API exports
export { default as apiClient } from './api/client';
export { default as ENDPOINTS } from './api/endpoints';
export * from './api/services';

// Components
export * from './components';

// Constants
export * from './constants';

// Hooks
export * from './hooks';

// Navigation
export * from './navigation';

// Screens
export * from './screens';

// Styles
export { default as globalStyles } from './styles/globalStyles';
export { default as theme } from './styles/theme';

// Types
export * from './types';

// Utils
export * from './utils';

