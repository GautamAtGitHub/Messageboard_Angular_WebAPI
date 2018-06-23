import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class AuthService {

    BASE_URL = 'http://localhost:51692/auth';
    NAME_KEY = 'name';
    TOKEN_KEY = 'token';

    constructor(private http: Http, private router: Router, private sb: MatSnackBar) {

    }

    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    get tokenHeader() {
        var header = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY) });

        return new RequestOptions({headers: header});
    }

    logIn(loginData) {
        this.http.post(this.BASE_URL + '/login', loginData).subscribe(res => {
            this.authenticate(res);
        }, error => {
            this.handleError(error);
        });
    }

    register(user) {
        delete user.confirmPassword;
        this.http.post(this.BASE_URL + '/register', user).subscribe(res => {
            this.authenticate(res);
        }, error => {
            this.handleError(error);
        });
    }

    logOut() {
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
    }

    authenticate(res) {

        var authResponse = res.json();
        if (!authResponse.token)
            return;

        localStorage.setItem(this.TOKEN_KEY, res.json().token); //Store this in browser local storage
        localStorage.setItem(this.NAME_KEY, res.json().firstName); //Store this in browser local storage

        this.router.navigate(['/']);
    }

    private handleError(error) {
        console.error(error);
        this.sb.open(error._body, 'X', { duration: 4000 });
    }

}