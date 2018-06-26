import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
@Component({
    selector: 'app-nav',
    template: `
    <mat-toolbar color="primary">
        
        <button *ngIf="auth.isAuthenticated" mat-button routerLink="/" >Message Board</button>
        <button *ngIf="auth.isAuthenticated" mat-button routerLink="/messages" >Messages</button>
        <span style="flex: 1 1 auto"></span>
        <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/login" >Login</button>
        <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/register" >Register</button>
        <button *ngIf="auth.isAuthenticated" mat-button routerLink="/user" >Welcome {{auth.name}}</button>
        <button *ngIf="auth.isAuthenticated" mat-button (click)="auth.logOut()" >Logout</button>
    </mat-toolbar>
    `
})

export class NavComponent {

    constructor(private auth: AuthService) {
    }
  
  }