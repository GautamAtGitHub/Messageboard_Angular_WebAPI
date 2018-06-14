import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";


@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
    .error{
        background-color:#fff0f0
    }
    `]
})

export class RegisterComponent {
    formGroup;

    constructor(private fb: FormBuilder) {
        this.formGroup = fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, emailValid()]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: matchingFields('password', 'confirmPassword') });
    }

    OnSubmit() {
        console.log(this.formGroup.errors);
    }

    isValid(control) {
        return this.formGroup.controls[control].invalid && this.formGroup.controls[control].touched;
    }
}

function matchingFields(field1, field2) {
    return formGroupGautam => {
        if (formGroupGautam.controls[field1].value != formGroupGautam.controls[field2].value) {
            return { mismatchedFields: true };
        }
        else return null;
    };

}

function emailValid() {
    return control => {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return regex.test(control.value) ? null : { invalidEmail: true };
    }
}