/**
 * Validation Utilities
 * Helper functions for form validation
 */

import { STRINGS } from '../constants/strings';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {ValidationResult} Validation result
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      message: STRINGS.validation.required,
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: STRINGS.validation.email,
    };
  }

  return { isValid: true };
};

/**
 * Validate phone number (Vietnamese format)
 * @param {string} phone - Phone number to validate
 * @returns {ValidationResult} Validation result
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone || phone.trim() === '') {
    return {
      isValid: false,
      message: STRINGS.validation.required,
    };
  }

  // Vietnamese phone format: 10 digits starting with 0
  const phoneRegex = /^0\d{9}$/;
  
  if (!phoneRegex.test(phone)) {
    return {
      isValid: false,
      message: STRINGS.validation.phone,
    };
  }

  return { isValid: true };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum password length (default: 6)
 * @returns {ValidationResult} Validation result
 */
export const validatePassword = (
  password: string,
  minLength: number = 6
): ValidationResult => {
  if (!password || password.trim() === '') {
    return {
      isValid: false,
      message: STRINGS.validation.required,
    };
  }

  if (password.length < minLength) {
    return {
      isValid: false,
      message: STRINGS.validation.min(minLength),
    };
  }

  return { isValid: true };
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {ValidationResult} Validation result
 */
export const validateRequired = (
  value: string,
  fieldName?: string
): ValidationResult => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      message: fieldName 
        ? `${fieldName} ${STRINGS.validation.required.toLowerCase()}`
        : STRINGS.validation.required,
    };
  }

  return { isValid: true };
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @returns {ValidationResult} Validation result
 */
export const validateMinLength = (
  value: string,
  minLength: number
): ValidationResult => {
  if (!value || value.length < minLength) {
    return {
      isValid: false,
      message: STRINGS.validation.min(minLength),
    };
  }

  return { isValid: true };
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @returns {ValidationResult} Validation result
 */
export const validateMaxLength = (
  value: string,
  maxLength: number
): ValidationResult => {
  if (value && value.length > maxLength) {
    return {
      isValid: false,
      message: STRINGS.validation.max(maxLength),
    };
  }

  return { isValid: true };
};

/**
 * Validate password match
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirm password
 * @returns {ValidationResult} Validation result
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: STRINGS.validation.passwordMatch,
    };
  }

  return { isValid: true };
};

export default {
  validateEmail,
  validatePhone,
  validatePassword,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validatePasswordMatch,
};
