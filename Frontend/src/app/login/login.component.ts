import { Component } from "@angular/core";
import { AuthService } from ".././auth.service";
@Component({
    selector: 'app-login',
    template: `
    <mat-card class="card"> 
        <mat-input-container style="Width:350px;">
            <input [(ngModel)]="loginData.email"  matInput placeholder="Email" type="email">
        </mat-input-container>
        <br>
        <mat-input-container style="Width:350px;">
            <input [(ngModel)]="loginData.password" matInput placeholder="Password" type="password">
        </mat-input-container>
        <br>
        <button mat-raised-button color="primary" (click)="login()" >Login</button>
    </mat-card> 
    `
})

export class LoginComponent {

    constructor(private auth: AuthService) {
    }
  
    loginData = {
        email:'',
        password:''
    }

    login(){
        this.auth.logIn(this.loginData);
    }
  }