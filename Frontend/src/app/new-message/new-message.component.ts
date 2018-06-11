import { Component } from "@angular/core";
import { WebService } from "./../WebService";

@Component({
    selector: 'app-new-message',
    template: `
    <mat-card class="card"> 
        <mat-form-field>
            <input [(ngModel)]="message.owner" matInput placeholder="Name">
        </mat-form-field>
        <mat-form-field>
            <textarea [(ngModel)]="message.text" matInput placeholder="Message"></textarea>
        </mat-form-field>
        <mat-card-actions>
            <button (click)="post()" mat-button color="primary">POST</button>
        </mat-card-actions>
    </mat-card>

    `
})

export class NewMessageComponent {

    // @Output() onPostedEvent = new EventEmitter(); 

    constructor(private WebService: WebService) {
    }

    message = {
        owner : "",
        text : ""
    }

    post(){
        this.WebService.postMessage(this.message);
        //this.onPostedEvent.emit(this.message);
    }
}