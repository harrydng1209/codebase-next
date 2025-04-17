import { profile, refreshToken as refreshTokenApi } from '@/apis/auth.api';
import { COOKIE_KEYS } from '@/constants/shared.const';
import { ERole } from '@/models/enums/auth.enum';
import { IUserInfo } from '@/models/interfaces/auth.interface';
import jsCookie from 'js-cookie';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IState {
  accessToken: null | string;
  actions: {
    initialize: () => Promise<void>;
    logout: () => void;
    refreshToken: () => Promise<boolean>;
    setToken: (token: string) => void;
    setUser: (data: IUserInfo) => void;
  };
  getters: {
    getIsAuthenticated: () => boolean;
    getToken: () => null | string;
    getUserInfo: () => IUserInfo | undefined;
    getUserRole: () => ERole | undefined;
  };
  isAuthenticated: boolean;
  userInfo?: IUserInfo;
}

export const authStore = create<IState>()(
  devtools((set, get) => ({
    accessToken: jsCookie.get(COOKIE_KEYS.ACCESS_TOKEN),

    actions: {
      initialize: async () => {
        if (get().isAuthenticated) return;

        const isLoggedIn = Boolean(get().accessToken);
        if (!isLoggedIn) return;

        try {
          const response = await profile();
          get().actions.setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      },

      logout: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          userInfo: undefined,
        });
        jsCookie.remove(COOKIE_KEYS.ACCESS_TOKEN);
      },

      refreshToken: async (): Promise<boolean> => {
        let result = true;
        try {
          const response = await refreshTokenApi();
          get().actions.setToken(response.data.accessToken);
        } catch (error) {
          result = false;
          console.error(error);
        }
        return result;
      },

      setToken: (token: string) => {
        jsCookie.set(COOKIE_KEYS.ACCESS_TOKEN, token, {
          expires: 1,
          path: '/',
          sameSite: 'lax',
        });
        set({ accessToken: token });
      },

      setUser: (data: IUserInfo) =>
        set({ isAuthenticated: true, userInfo: data }),
    },

    getters: {
      getIsAuthenticated: () => get().isAuthenticated,
      getToken: () => get().accessToken,
      getUserInfo: () => get().userInfo,
      getUserRole: () => get().userInfo?.role,
    },

    isAuthenticated: false,
    userInfo: undefined,
  })),
);

export const useAuthStore = () => {
  const actions = authStore((state) => state.actions);
  const getters = authStore((state) => state.getters);

  return {
    ...getters,
    ...actions,
  };
};
