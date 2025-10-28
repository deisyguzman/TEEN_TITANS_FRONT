import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para agregar token si existe
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para manejar respuestas y errores
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Manejar token expirado o no autorizado
          localStorage.removeItem('token');
          // Opcional: redirigir al login
          // window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // GET request
  async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint, config);
      return response.data;
    } catch (error: any) {
      // Si es 404, retornar array vacío o null dependiendo del contexto
      if (error.response?.status === 404) {
        console.log(`ℹ️ No se encontraron datos en ${endpoint}`);
        // Retornar array vacío para listas, null para objetos individuales
        return (endpoint.includes('?') || !endpoint.match(/\/[^/]+$/)) ? [] as T : null as T;
      }
      console.error(`Error en GET ${endpoint}:`, error);
      throw error;
    }
  }

  // POST request
  async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(endpoint, data, config);
      return response.data;
    } catch (error: any) {
      if (error.response?.status !== 404) {
        console.error(`Error en POST ${endpoint}:`, error);
      }
      throw error;
    }
  }

  // PUT request
  async put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(endpoint, data, config);
      return response.data;
    } catch (error: any) {
      if (error.response?.status !== 404) {
        console.error(`Error en PUT ${endpoint}:`, error);
      }
      throw error;
    }
  }

  // PATCH request
  async patch<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.patch(endpoint, data, config);
      return response.data;
    } catch (error: any) {
      if (error.response?.status !== 404) {
        console.error(`Error en PATCH ${endpoint}:`, error);
      }
      throw error;
    }
  }

  // DELETE request
  async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(endpoint, config);
      return response.data;
    } catch (error: any) {
      if (error.response?.status !== 404) {
        console.error(`Error en DELETE ${endpoint}:`, error);
      }
      throw error;
    }
  }
}

// Exportar una instancia única (singleton)
const apiService = new ApiService();
export default apiService;
