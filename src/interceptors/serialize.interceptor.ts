import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { classToPlain } from "class-transformer";
import { Observable, map } from "rxjs";

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<CallHandler>
  ): Observable<any> | Promise<Observable<any>> {
    //run someting before request is handled
    return next.handle().pipe(
      map((data: any) => {
        // run somting before sending response
        console.log("i am running before sending response");
      })
    );
  }
}
