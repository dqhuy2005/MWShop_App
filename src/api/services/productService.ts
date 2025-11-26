import { ApiResponse, PaginationParams, Product, ProductListResponse } from '../../types';
import apiClient from '../client';
import ENDPOINTS from '../endpoints';

export const getProducts = async (params: PaginationParams): Promise<ProductListResponse> => {
  try {
    const response = await apiClient.get(
      ENDPOINTS.PRODUCTS.LIST,
      { params }
    );
    
    const responseData = response.data;
    
    if (responseData.data && typeof responseData.data === 'object') {
      return responseData.data;
    }
    
    return responseData;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
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
    console.error(`❌ Error fetching product ${id}:`, error);
    throw error;
  }
};

export const searchProducts = async (
  keyword: string,
  params: PaginationParams
): Promise<ProductListResponse> => {
  try {
    const response = await apiClient.get<ApiResponse<ProductListResponse>>(
      ENDPOINTS.PRODUCTS.SEARCH,
      { 
        params: {
          ...params,
          q: keyword,
        }
      }
    );
    
    return response.data.data;
  } catch (error) {
    console.error('❌ Error searching products:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.PRODUCTS.CATEGORIES);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    throw error;
  }
};
