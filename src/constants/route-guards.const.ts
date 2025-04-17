import { ERole } from '@/models/enums/auth.enum';

interface IRouteGuard {
  requiresAuth: boolean;
  roles: ERole[];
}

export const ROUTE_GUARDS: Record<string, IRouteGuard> = {
  '/': {
    requiresAuth: true,
    roles: [ERole.Admin, ERole.Moderator, ERole.SuperAdmin, ERole.User],
  },
  '/auth/login': {
    requiresAuth: false,
    roles: [],
  },
  '/auth/register': {
    requiresAuth: false,
    roles: [],
  },
  '/codebase': {
    requiresAuth: true,
    roles: [ERole.Admin, ERole.Moderator, ERole.SuperAdmin, ERole.User],
  },
};
