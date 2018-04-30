import { Component, OnInit } from "@angular/core";
import { WebService } from "./../WebService";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})

export class MessageComponent implements OnInit {

    messages = [];

    constructor(private WebService : WebService) { 
    }
  
    async ngOnInit() {
        var response = await this.WebService.getMEssages();
        this.messages = response.json();
    }
  
  }