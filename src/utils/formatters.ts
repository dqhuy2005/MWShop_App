/**
 * Formatters
 * Utility functions for formatting data
 */

/**
 * Format number as Vietnamese currency
 * @param {number} value - Number to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('vi-VN') + '₫';
};

/**
 * Format date to Vietnamese format
 * @param {Date|string} date - Date to format
 * @param {boolean} includeTime - Include time in format
 * @returns {string} Formatted date string
 */
export const formatDate = (date: Date | string, includeTime: boolean = false): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  
  if (includeTime) {
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  
  return `${day}/${month}/${year}`;
};

/**
 * Format phone number (Vietnamese format)
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhone = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as: 0xxx xxx xxx
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
};

/**
 * Format large numbers (1000 -> 1K, 1000000 -> 1M)
 * @param {number} value - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toString();
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

/**
 * Format time ago (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted time ago string
 */
export const formatTimeAgo = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffDay > 0) {
    return `${diffDay} ngày trước`;
  }
  if (diffHour > 0) {
    return `${diffHour} giờ trước`;
  }
  if (diffMin > 0) {
    return `${diffMin} phút trước`;
  }
  return 'Vừa xong';
};

export default {
  formatCurrency,
  formatDate,
  formatPhone,
  formatNumber,
  truncateText,
  formatTimeAgo,
};
