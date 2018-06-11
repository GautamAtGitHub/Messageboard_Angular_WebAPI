import { Component } from '@angular/core';
import { MessageComponent } from '.././messages/message.component';


@Component({
  selector: 'app-home',
  template: `
  <app-new-message></app-new-message>
  <app-message></app-message>
  
  `,
})
export class HomeComponent {

  //@ViewChild(MessageComponent) messagesComponent : MessageComponent

  // onPosted(message){
  //   this.messagesComponent.messages.push(message);
  // }

}
