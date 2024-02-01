import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { Account } from '../entities/account.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

    //Cuando no se envíen roles aceptados, se acepta cualquier rol
    if (!validRoles) return true;
    if ( validRoles.length === 0 ) return true;

    const req = context.switchToHttp().getRequest();
    const account = req.account as Account;

    if(!account){
      throw new BadRequestException('Account not found')
    }

    if (validRoles.includes(account.role.name)) {
      return true;
    }

    throw new ForbiddenException(`Account ${account.user.email} need a valid role: [${validRoles}]`);
  }
}
