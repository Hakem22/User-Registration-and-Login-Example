import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credential } from 'src/app/model/user';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private autheticationService: AuthenticationService,
    private router: Router,
    private alertsService: AlertsService
    ) {
      // redirect to home if already logged in
      if (this.autheticationService.currentUserValue) {
        this.router.navigate(['/home']);
    }
     }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true

    const credential : Credential = this.loginForm.value
    this.autheticationService.login(credential).subscribe(
      res => this.router.navigate(['/home']),
      err => this.alertsService.error(err)
    )
  }

}
