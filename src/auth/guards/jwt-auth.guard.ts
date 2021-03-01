import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(this.constructor.name);
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const request = ctx.req;
    return request;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.log(info);
      throw new UnauthorizedException('Invalid token or token has expired');
    }
    return user;
  }
}
