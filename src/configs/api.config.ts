import { TFailureResponse, TSuccessResponse } from '@/models/types/auth.type';
import { handleUnauthorizedError } from '@/utils/api.util';
import {
  convertToCamelCase,
  convertToSnakeCase,
  getAccessToken,
} from '@/utils/shared.util';
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { stringify } from 'qs';

export const apiConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => stringify(params, { indices: true }),
});

apiConfig.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (config.data && !(config.data instanceof FormData))
      config.data = convertToSnakeCase(config.data);
    if (config.params) config.params = convertToSnakeCase(config.params);
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error),
);

apiConfig.interceptors.response.use(
  (response: AxiosResponse<TSuccessResponse>) => {
    if (response.data) response.data = convertToCamelCase(response.data);
    return response;
  },
  (error: AxiosError<TFailureResponse>) => {
    const statusCode = error.response?.status;

    if (statusCode === HttpStatusCode.Unauthorized)
      handleUnauthorizedError(error);

    return Promise.reject(error);
  },
);
