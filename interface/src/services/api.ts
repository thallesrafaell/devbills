import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

import { firebaseAuth } from '../config/firebase';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 seconds timeout
});

api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    // Verificar se o usuário está autenticado
    const user = firebaseAuth.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.set('Authorization', `Bearer ${token}`);
      } catch (error) {
        // Continuar a requisição mesmo com erro no token
        throw new Error('Erro ao obter token de autenticação: ' + error);
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export { api };
