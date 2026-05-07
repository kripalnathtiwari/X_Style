export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}, token: string | null) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        // Token might be expired, clear it and notify the app
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('auth:unauthorized'));
        }
      }
      const error = new Error(data.message || 'Something went wrong');
      (error as any).status = response.status;
      throw error;
    }

    return data;
  } catch (error: any) {
    // We already handle 401s by clearing state and dispatching an event.
    // Only log other types of errors to the console to reduce noise.
    if (error.status !== 401) {
      console.error(`API Error [${endpoint}]:`, error.message);
    }
    throw error;
  }
};
