import { Component } from "@angular/core";
import { WebService } from "./../WebService";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})

export class MessageComponent {

    constructor(private WebService : WebService, private route: ActivatedRoute) { 
    }

    messages;

    ngOnInit(){
        var name = this.route.snapshot.params.name;
        this.WebService.getMEssages(name);
        // this.WebService.messagesObservable.subscribe(updatedMessages => {
        //     this.messages = updatedMessages;
        // });
    }
  
  }