import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from "../../services/authservices/auth.service";
// import { Errors } from '../model/Error';
import { Errors } from '../../model/Error';
import { Router } from '@angular/router';
import { JwtService } from "../../sharedservices/jwtToken";

// Declaring component for sign-up page
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hide = true;
  signupForm: FormGroup;
  error = false;
  errorList;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private authService: AuthService, private router: Router, private jwtService: JwtService) {

  }

  //   Load sign-up page
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: this.email,
      username: new FormControl(''),
      password: new FormControl('')
    })
  }


  // Validation for email field
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // Authenticate and sign-up
  onSubmit() {
    this.error = false;
    this.authService.signUp(this.signupForm.value).subscribe(
      data => {
        this.authService.signIn(this.signupForm.value).subscribe(
          data => {
            this.router.navigate(['/home']);
          },
          err => {
            this.errorList = err;
            this.error = true;
          });
        this.signupForm.reset();
      },
      err => {
        this.errorList = err;
        this.error = true;
      });
  }
}
