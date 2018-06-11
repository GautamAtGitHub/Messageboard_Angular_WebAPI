import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:51692/api/';
    messages = [];

    constructor(private http: Http, private sb: MatSnackBar) {
        this.getMEssages();
    }


    async getMEssages() {

        try {
            var response = await this.http.get(this.BASE_URL + '/messages').toPromise();
            this.messages = response.json();
        } catch (error) {
            this.handleError("Unable to get messages");
        }

    }

    async postMessage(message) {
        try {
            var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
            this.messages.push(response.json());
        } catch (error) {
            this.handleError("Unable to post messages");
        }

    }

    private handleError(error) {
        console.error(error);
        this.sb.open(error, 'X', { duration: 4000 });
    }
}