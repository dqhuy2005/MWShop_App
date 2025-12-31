import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { STRINGS } from "../constants/strings";

const ERROR_MESSAGES: Record<string, string> = {
  NETWORK_ERROR: STRINGS.errors.network,
  SERVER_ERROR: STRINGS.errors.server,
  UNAUTHORIZED: STRINGS.errors.unauthorized,
  FORBIDDEN: STRINGS.errors.forbidden,
  NOT_FOUND: STRINGS.errors.notFound,
  VALIDATION_ERROR: STRINGS.errors.validation,
  UNKNOWN_ERROR: STRINGS.errors.unknown,
};

export const getErrorMessage = (error: any): string => {
  if (!error.response) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  const status = error.response?.status;
  const message = error.response?.data?.message;

  if (message && typeof message === "string") {
    return message;
  }

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

export const logError = (error: AxiosError): void => {
  if (!__DEV__) return;

  console.error("❌ API Error:", {
    message: error.message,
    config: error.config,
    response: error.response,
  });
};

export const logRequest = (config: InternalAxiosRequestConfig): void => {
  if (!__DEV__) return;
};

export const logResponse = (response: AxiosResponse): void => {
  if (!__DEV__) return;
};

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
