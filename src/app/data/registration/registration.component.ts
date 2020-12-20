import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credential, User } from 'src/app/model/user';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertsService: AlertsService,
    private userService: UserService,
    private authenticationService: AuthenticationService
    ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/home']);
    }
    }

  ngOnInit(): void {
    this.createLoginForm()
  }


  revert() {
    // Resets to blank object
    this.registerForm.reset();

    // Resets to provided model
    this.registerForm.reset({ credential: new Credential(), firstName: '', lastName: '' });
  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  createLoginForm() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        credential: this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(8)]]
        })
    })
  }


  onSubmit() {
    this.submitted = true;

    const user : User = this.registerForm.value
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.alertsService.success('Registration successful', true)
        this.router.navigate(['/login'])
      },
      err => this.alertsService.error(err)
    )
  }
}
