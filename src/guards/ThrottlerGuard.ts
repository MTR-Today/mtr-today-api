import { ContextType, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ThrottlerGuard as NestThrottlerGuard } from '@nestjs/throttler'

@Injectable()
export class ThrottlerGuard extends NestThrottlerGuard {
  override getRequestResponse(context: ExecutionContext) {
    const reqType = context.getType<ContextType | 'graphql'>()
    if (reqType === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context)
      const ctx = gqlCtx.getContext()
      return { req: ctx.req, res: ctx.req.res }
    }

    return {
      req: context.switchToHttp().getRequest(),
      res: context.switchToHttp().getResponse(),
    }
  }
}
