import { Component } from "@angular/core";
import { WebService } from "./../WebService";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})

export class MessageComponent {

    constructor(private WebService : WebService) { 
    }
  
  }