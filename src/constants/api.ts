import { API_URL } from "@env";

export const API_BASE_URL = API_URL || "http://192.168.2.8:8000/api";
export const API_TIMEOUT = 30000; // 30 seconds
export const MAX_RETRY_ATTEMPTS = 3;
export const RETRY_DELAY = 1000; // 1 second

// Pagination
export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 25;

export default {
  API_BASE_URL,
  API_TIMEOUT,
  MAX_RETRY_ATTEMPTS,
  RETRY_DELAY,
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
};
