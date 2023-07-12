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
export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    //befor a reuest handlet

    return next.handle().pipe(
      map((data: any) => {
        //run something befor sending response
        console.log(data);
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}
