import { Component } from "@angular/core";
import { WebService } from ".././WebService";
@Component({
    selector: 'app-user',
    template: `
        <mat-card class="card"> 
        <mat-input-container style="Width:350px;">
            <input [(ngModel)]="model.firstName"  matInput placeholder="First Name">
        </mat-input-container>
        <br>
        <mat-input-container style="Width:350px;">
            <input [(ngModel)]="model.lastName" matInput placeholder="Last Name">
        </mat-input-container>
        <br>
        <button mat-raised-button color="primary" (click)="saveUser(model)" >Save Changes</button>
        </mat-card> 
   
    `
})

export class UserComponent {

    model = {
        firstName:'',
        lastName:''
    };
    constructor(private webService: WebService) {
    }
  
    ngOnInit(){
        this.webService.getUser().subscribe(res => {
            this.model.firstName = res.firstName;
            this.model.lastName = res.lastName;
        });
    }

    saveUser(userData){
        console.log(userData);
        this.webService.saveUser(userData).subscribe();
    }
  }