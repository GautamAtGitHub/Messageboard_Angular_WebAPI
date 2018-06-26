import { Component } from "@angular/core";
import { WebService } from "./../WebService";
import { AuthService } from "./../auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-new-message',
    template: `
    <mat-card class="card"> 
        <mat-form-field style="Width:350px;">
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

    constructor(private WebService: WebService, private auth: AuthService,  private router: Router) {
        if (!this.auth.isAuthenticated) {
            this.router.navigate(['/login']);
        }
    }

    message = {
        owner : this.auth.name,
        text : ""
    }

    post(){
        this.WebService.postMessage(this.message);
        //this.onPostedEvent.emit(this.message);
    }
}