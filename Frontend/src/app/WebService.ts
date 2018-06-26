import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Subject } from 'rxjs/Rx';
import { AuthService } from "./auth.service";

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:51692/api';

    private messageStore = [];

    private messageSubject = new Subject();
    messagesObservable = this.messageSubject.asObservable();

    constructor(private http: Http, private sb: MatSnackBar, private auth: AuthService) {
        // if (this.auth.isAuthenticated) {
        //     this.getMEssages('');
        // }
    }


    getMEssages(user) {
        user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + '/messages' + user, this.auth.tokenHeader).subscribe(response => {
            this.messageStore = response.json();
            this.messageSubject.next(this.messageStore);
        }, error => {
            this.handleError("Unable to get messages");
        });
    }

    async postMessage(message) {
        try {
            var response = await this.http.post(this.BASE_URL + '/messages', message, this.auth.tokenHeader).toPromise();
            this.messageStore.push(response.json());
        } catch (error) {
            this.handleError("Unable to post messages");
        }

    }

    getUser() {
        return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).map(res => res.json());
    }

    saveUser(UserData) {
        return this.http.post(this.BASE_URL + '/users/me', UserData, this.auth.tokenHeader).map(res => res.json());
    }

    private handleError(error) {
        console.error(error);
        this.sb.open(error, 'X', { duration: 4000 });
    }
}