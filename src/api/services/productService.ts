import {
  ApiResponse,
  PaginationParams,
  Product,
  ProductListResponse,
} from "../../types";
import apiClient from "../client";
import ENDPOINTS from "../endpoints";

export const getProducts = async (
  params: PaginationParams
): Promise<ProductListResponse> => {
  try {
    const response = await apiClient.get(ENDPOINTS.HOME.LIST, { params });

    const responseData = response.data;

    if (responseData.data && typeof responseData.data === "object") {
      const data = responseData.data;

      if (data.products && Array.isArray(data.products)) {
        return data;
      } else {
        const error: any = new Error("Thử lại");
        error.isValidationError = true;
        throw error;
      }
    }

    if (responseData.products && Array.isArray(responseData.products)) {
      return responseData;
    }

    const error: any = new Error("Thử lại");
    error.isValidationError = true;
    throw error;
  } catch (error: any) {
    throw error;
  }
};

export const getProductById = async (id: number | string): Promise<Product> => {
  try {
    const response = await apiClient.get<ApiResponse<Product>>(
      ENDPOINTS.PRODUCTS.DETAIL(id)
    );

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const searchProducts = async (
  keyword: string,
  params: PaginationParams
): Promise<ProductListResponse> => {
  try {
    const response = await apiClient.get(ENDPOINTS.HOME.SEARCH, {
      params: {
        q: keyword,
        per_page: params.per_page,
        page: params.page,
      },
    });

    const responseData = response.data;

    if (responseData.data && typeof responseData.data === "object") {
      const data = responseData.data;

      if (data.products && Array.isArray(data.products)) {
        return data;
      } else {
        const error: any = new Error("Thử lại");
        error.isValidationError = true;
        throw error;
      }
    }

    if (responseData.products && Array.isArray(responseData.products)) {
      return responseData;
    }

    const error: any = new Error("Thử lại");
    error.isValidationError = true;
    throw error;
  } catch (error: any) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.PRODUCTS.CATEGORIES);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
