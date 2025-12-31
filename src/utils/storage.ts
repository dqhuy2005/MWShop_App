import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
  CART_DATA: "cart_data",
  THEME: "theme",
  LANGUAGE: "language",
};

const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
    throw error;
  }
};

const getItem = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
};

const getObject = async <T = any>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting object ${key}:`, error);
    return null;
  }
};

const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
    throw error;
  }
};

const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
    throw error;
  }
};

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
    console.error("Error getting multiple items:", error);
    return {};
  }
};

const multiSet = async (
  keyValuePairs: Array<[string, string]>
): Promise<void> => {
  try {
    await AsyncStorage.multiSet(keyValuePairs);
  } catch (error) {
    console.error("Error setting multiple items:", error);
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
