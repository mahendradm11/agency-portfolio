import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.sorazen.io';

/**
 * Submit a contact form inquiry.
 * Replace BASE_URL in your .env file:
 *   VITE_API_URL=https://your-backend.com
 *
 * Expected payload:
 * {
 *   name: string,
 *   email: string,
 *   phone?: string,
 *   service: string,
 *   budget: string,
 *   timeline: string,
 *   message: string,
 * }
 */
export async function submitContactForm(data) {
  try {
    const response = await axios.post(`${BASE_URL}/api/contact`, data, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    });
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';
    return { success: false, error: message };
  }
}