export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },

  HOME: {
    LIST: '/home',
    SEARCH: '/search',
  },

  // Products
  PRODUCTS: {
    LIST: '/home',
    DETAIL: (id: number | string) => `/products/${id}`,
    SEARCH: '/products/search',
    CATEGORIES: '/products/categories',
  },

  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    ORDERS: '/user/orders',
    ORDER_DETAIL: (id: number | string) => `/user/orders/${id}`,
  },

  // Cart
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: (id: number | string) => `/cart/update/${id}`,
    REMOVE: (id: number | string) => `/cart/remove/${id}`,
    CLEAR: '/cart/clear',
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    READ: (id: number | string) => `/notifications/${id}/read`,
    READ_ALL: '/notifications/read-all',
    DELETE: (id: number | string) => `/notifications/${id}`,
  },
};

export default ENDPOINTS;
