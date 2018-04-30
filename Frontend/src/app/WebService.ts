import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";

@Injectable()
export class WebService{
    constructor(private http: Http){

    }
    
    getMEssages(){

        return this.http.get('http://localhost:51692/api/messages').toPromise();
    }
}