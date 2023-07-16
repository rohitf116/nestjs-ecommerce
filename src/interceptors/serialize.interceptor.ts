import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  createParamDecorator,
} from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";
export const ExcludeSerialize = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    request.excludeSerialize = true;
    return;
  }
);
export function Serialize(dto: any, message: string) {
  return UseInterceptors(new SerializeInterceptor(dto, message));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any, private message: string) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        const response: any = {
          message: this.message,
          data: plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
          }),
        };

        if (Array.isArray(data)) {
          response.items = data.length;
        }

        return response;
      })
    );
  }
}
