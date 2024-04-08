import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetAccount = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const account = req.user;

    if (!account) {
      throw new InternalServerErrorException('Account not found in request');
    }
    return !data ? account : account[data];
  },
);
