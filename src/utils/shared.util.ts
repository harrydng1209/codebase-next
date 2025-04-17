import { COOKIE_KEYS } from '@/constants/shared.const';
import { EResponseStatus } from '@/models/enums/auth.enum';
import { ELanguageCode, EToast } from '@/models/enums/shared.enum';
import { TFailureResponse } from '@/models/types/auth.type';
import { TDate, TObjectUnknown } from '@/models/types/shared.type';
import { authStore } from '@/stores/auth.store';
import { notification } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import jsCookie from 'js-cookie';
import { capitalize } from 'lodash-es';
import { stringify } from 'qs';
import { create, StateCreator } from 'zustand';

dayjs.extend(utc);

export const cleanQuery = <T>(query: TObjectUnknown): T => {
  const cleanedQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== undefined && value !== '',
    ),
  );
  return cleanedQuery as T;
};

export const convertToCamelCase = <T>(
  data: TObjectUnknown | TObjectUnknown[],
): T => {
  if (Array.isArray(data))
    return data.map((item) => convertToCamelCase(item)) as T;
  if (data === null || typeof data !== 'object') return data as T;

  const newObject: TObjectUnknown = {};
  Object.keys(data).forEach((key) => {
    const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    const value = data[key];

    if (typeof value === 'object' && value !== null) {
      if (
        (value as TObjectUnknown).constructor === Object ||
        Array.isArray(value)
      ) {
        newObject[newKey] = convertToCamelCase(value as TObjectUnknown);
        return;
      }
    }
    newObject[newKey] = value;
  });
  return newObject as T;
};

export const convertToSnakeCase = <T>(
  data: TObjectUnknown | TObjectUnknown[],
): T => {
  if (Array.isArray(data))
    return data.map((item) => convertToSnakeCase(item)) as T;
  if (!data || typeof data !== 'object') return data as T;

  const newObject: TObjectUnknown = {};
  Object.keys(data).forEach((key) => {
    const newKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
    const value = data[key];

    if (typeof value === 'object' && value !== null) {
      newObject[newKey] = convertToSnakeCase(value as TObjectUnknown);
      return;
    }
    newObject[newKey] = value;
  });
  return newObject as T;
};

export const formatDateUTC = (date: TDate) => {
  return dayjs(date).utc().toISOString();
};

export const formatQueryString = (
  baseUrl: string,
  query: string | string[] | TObjectUnknown,
): string => {
  if (
    !query ||
    (Array.isArray(query) && query.length === 0) ||
    (typeof query === 'object' && Object.keys(query).length === 0)
  )
    return baseUrl;

  const queryString =
    typeof query === 'string'
      ? query
      : stringify(query, { arrayFormat: 'brackets' });
  return `${baseUrl}?${queryString}`;
};

export const isFailureResponse = (
  response: Error | TFailureResponse,
): response is TFailureResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'status' in response &&
    response.status === EResponseStatus.Failure
  );
};

export const showToast = (
  description: string,
  type = EToast.Success,
  message: string = capitalize(type),
) => {
  notification[type]({
    description,
    duration: 3,
    message,
  });
};

export const sleep = async (second: number) => {
  return await new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, 1000 * second);
  });
};

export const resetAll = <T>(stateCreator?: StateCreator<T>) => {
  const storeResetFns = new Set<() => void>();

  if (stateCreator) {
    const store = create(stateCreator);
    const initialState = store.getInitialState();
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
  }

  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};

export const getPathnameWithoutLocale = (pathname: string) => {
  const locales = Object.values(ELanguageCode);
  const pathParts = pathname.split('/');

  if (pathParts.length > 1 && locales.includes(pathParts[1] as ELanguageCode))
    return '/' + pathParts.slice(2).join('/');

  return pathname;
};

export const getAccessToken = (): null | string | undefined => {
  if (typeof window !== 'undefined')
    return jsCookie.get(COOKIE_KEYS.ACCESS_TOKEN);

  const { getters } = authStore.getState();
  return getters.getToken();
};
