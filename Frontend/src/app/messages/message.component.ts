import { Component } from "@angular/core";
import { WebService } from "./../WebService";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from ".././auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})

export class MessageComponent {

    constructor(private WebService: WebService, private route: ActivatedRoute, private router: Router, private auth: AuthService) {

    }

    messages;

    ngOnInit() {

        if (!this.auth.isAuthenticated) {
            this.router.navigate(['/login']);
        }
        else {
            var name = this.route.snapshot.params.name;
            this.WebService.getMEssages(name);
            this.WebService.getUser().subscribe();
            // this.WebService.messagesObservable.subscribe(updatedMessages => {
            //     this.messages = updatedMessages;
            // });
        }
    }

}