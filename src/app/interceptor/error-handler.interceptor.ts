import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        this.snackBar.open(
          `${httpErrorResponse.status} ${httpErrorResponse.statusText}, ${httpErrorResponse.error.message}`,
          'OK',
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
        throw httpErrorResponse;
      })
    );
  }
}
