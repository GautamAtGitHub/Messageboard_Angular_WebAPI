import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

    BASE_URL = 'http://localhost:51692/auth';
    NAME_KEY = 'name';
    TOKEN_KEY = 'token';

    constructor(private http: Http, private router: Router) {

    }

    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    register(user) {
        delete user.confirmPassword;
        this.http.post(this.BASE_URL + '/register', user).subscribe(res => {

            var authResponse = res.json();

            if (!authResponse.token)
                return;

            localStorage.setItem(this.TOKEN_KEY, res.json().token); //Store this in browser local storage
            localStorage.setItem(this.NAME_KEY, res.json().firstName); //Store this in browser local storage

            this.router.navigate(['/']);
        });
    }

    logOut(){
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
    }
}