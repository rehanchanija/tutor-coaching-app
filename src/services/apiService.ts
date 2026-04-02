import { storageService } from './storageService';

const BASE_URL = 'http://tutor-coaching-backend.vercel.app';
// ';

export const apiCall = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<any> => {
  const url = `${BASE_URL}${endpoint}`;

  // Get token from storage
  const session = await storageService.getSession();
  const token = session?.token;

  const headers: any = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Something went wrong');
    }

    const responseData = await response.json();

    // Unwrap Nested Data (Backend uses TransformInterceptor)
    if (responseData && responseData.data !== undefined) {
      return responseData.data;
    }

    return responseData;
  } catch (error) {
    console.error(`API Call failed: ${endpoint}`, error);
    throw error;
  }
};
