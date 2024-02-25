import { Component } from '@angular/core';
import { GlobalErrorHandlerService } from 'src/app/services/global-error-handler.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  constructor(private errorHandler: GlobalErrorHandlerService){}
  static errorMessage: string = '';
  static message: string = '';
  
  public getErrorMessage(){
    return NotificationComponent.errorMessage;
  }
  public getMessage(){
    return NotificationComponent.message;
  }

  public static displayError(errorMessage: string) {
    this.message = '';
    this.errorMessage = errorMessage;
  }

  public static displayMessage(message: string) {
    this.errorMessage = '';
    this.message = message;
  }
}
