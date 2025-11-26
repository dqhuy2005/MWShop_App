/**
 * Storage Utility
 * Wrapper for AsyncStorage with error handling
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  CART_DATA: 'cart_data',
  THEME: 'theme',
  LANGUAGE: 'language',
};

/**
 * Set item in storage
 * @param {string} key - Storage key
 * @param {any} value - Value to store (will be stringified)
 */
const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
    throw error;
  }
};

/**
 * Get item from storage
 * @param {string} key - Storage key
 * @returns {Promise<string|null>} Stored value or null
 */
const getItem = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
};

/**
 * Get object from storage (auto-parse JSON)
 * @param {string} key - Storage key
 * @returns {Promise<any>} Parsed object or null
 */
const getObject = async <T = any>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting object ${key}:`, error);
    return null;
  }
};

/**
 * Remove item from storage
 * @param {string} key - Storage key
 */
const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
    throw error;
  }
};

/**
 * Clear all storage
 */
const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};

/**
 * Get multiple items at once
 * @param {string[]} keys - Array of storage keys
 * @returns {Promise<Record<string, string>>} Object with key-value pairs
 */
const multiGet = async (keys: string[]): Promise<Record<string, string>> => {
  try {
    const result = await AsyncStorage.multiGet(keys);
    return result.reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.error('Error getting multiple items:', error);
    return {};
  }
};

/**
 * Set multiple items at once
 * @param {Array<[string, string]>} keyValuePairs - Array of [key, value] pairs
 */
const multiSet = async (keyValuePairs: Array<[string, string]>): Promise<void> => {
  try {
    await AsyncStorage.multiSet(keyValuePairs);
  } catch (error) {
    console.error('Error setting multiple items:', error);
    throw error;
  }
};

export const storage = {
  setItem,
  getItem,
  getObject,
  removeItem,
  clear,
  multiGet,
  multiSet,
  KEYS: STORAGE_KEYS,
};

export default storage;
