import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationComponent } from '../components/notification/notification.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }
  
  handleError(error: any): void {
    const errorHttp = error as HttpErrorResponse;
    const errorString = errorHttp.error? errorHttp.error : error as string;
    NotificationComponent.displayError(errorString)
    console.log('Error: ',error);
  }
}
