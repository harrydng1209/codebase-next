import type { NextRequest } from 'next/server';

import { ROUTE_GUARDS } from '@/constants/route-guards.const';
import { AUTH_PAGES, FORBIDDEN } from '@/constants/route-pages.const';
import { authStore } from '@/stores/auth.store';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { COOKIE_KEYS } from './constants/shared.const';
import { routing } from './i18n/routing';
import { getPathnameWithoutLocale } from './utils/shared.util';

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

const i18nMiddleware = createMiddleware(routing);

const authMiddleware = async (request: NextRequest) => {
  const { actions, getters } = authStore.getState();
  const pathname = getPathnameWithoutLocale(request.nextUrl.pathname);

  if (ROUTE_GUARDS[pathname].requiresAuth) {
    await actions.initialize();

    if (!getters.getIsAuthenticated())
      return NextResponse.redirect(new URL(AUTH_PAGES.LOGIN, request.url));

    const requiresRoles = ROUTE_GUARDS[pathname].roles;
    const userRole = getters.getUserRole();
    const hasRequiredRole = requiresRoles?.some((role) => role === userRole);

    if (requiresRoles.length && !hasRequiredRole)
      return NextResponse.redirect(new URL(FORBIDDEN, request.url));
  }
  return NextResponse.next();
};

const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN);

  if (accessToken?.value) {
    const { actions } = authStore.getState();
    actions.setToken(accessToken.value);
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  )
    return NextResponse.next();

  const authResponse = await authMiddleware(request);
  if (authResponse.status !== 200) return authResponse;

  return i18nMiddleware(request);
};

export default middleware;
