// services/apiService.ts

type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    token?: string;
    data?: Record<string, unknown> | null;
  };
  
  export const apiFetch = async <T>(
    url: string,
    { method = 'GET', token, data = null }: FetchOptions = {}
  ): Promise<T> => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
  
    // Agregar el token al encabezado si existe
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const fetchOptions: RequestInit = {
      method,
      headers,
    };
  
    // Si el método es POST, PUT o DELETE y hay datos, agrégalos al cuerpo
    if (data && ['POST', 'PUT', 'DELETE'].includes(method)) {
      fetchOptions.body = JSON.stringify(data);
    }
  
    try {
      const response = await fetch(url, fetchOptions);
  
      // Lanza un error si la respuesta no es satisfactoria
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      // Parsea y retorna el JSON si la respuesta es satisfactoria
      return (await response.json()) as T;
    } catch (error) {
      console.error('Error en apiFetch:', error);
      throw error; // Re-lanza el error para que pueda ser manejado externamente si es necesario
    }
  };
  