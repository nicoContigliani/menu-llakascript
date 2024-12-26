type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  token?: string;
  data?: Record<string, unknown> | null;
  headers?: Record<string, string>;
};

export const apiFetch = async <T>(
  url: string,
  { method = 'GET', token, data = null, headers = {} }: FetchOptions = {}
): Promise<T> => {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers: defaultHeaders,
    body: data && ['POST', 'PUT', 'DELETE'].includes(method)
      ? JSON.stringify(data)
      : undefined,
  };

  try {
    const response = await fetch(url, fetchOptions);
    console.log("🚀 ~ response:", response);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Error ${response.status}: ${response.statusText} - ${errorBody || 'No additional details'}`
      );
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      return await response.json() as T;
    } else {
      return await response.text() as unknown as T;
    }
  } catch (error) {
    console.error('Error en apiFetch:', error);
    throw error;
  }
};