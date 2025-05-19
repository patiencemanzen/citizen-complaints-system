import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../utilities/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('No user found in request');
    }

    // Safely extract roles as string array
    let userRoles: string[] = [];
    if (
      user &&
      Object.prototype.hasOwnProperty.call(user, 'roles') &&
      Array.isArray((user as Record<string, unknown>)['roles'])
    ) {
      const rolesRaw = (user as Record<string, unknown>)['roles'];
      userRoles = Array.isArray(rolesRaw)
        ? rolesRaw.filter((r) => typeof r === 'string')
        : [];
    } else if (
      user &&
      Object.prototype.hasOwnProperty.call(user, 'role') &&
      typeof (user as Record<string, unknown>)['role'] === 'string'
    ) {
      userRoles = [(user as Record<string, unknown>)['role'] as string];
    }

    const hasRole = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Insufficient role');
    }

    return true;
  }
}
