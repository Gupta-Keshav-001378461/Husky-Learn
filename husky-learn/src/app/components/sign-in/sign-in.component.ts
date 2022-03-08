import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from "../../services/authservices/auth.service";
import { Router } from '@angular/router';
import { JwtService } from "../../sharedservices/jwtToken";

// Declaring component for sign-in page
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide = true;
  signinForm: FormGroup;
  error = false;
  errorList;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: AuthService, private router: Router, private jwtService: JwtService) {

  }

  //  Load sign-in page
  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: this.email,
      username: new FormControl(''),
      password: new FormControl('')
    })
  }


  // Check validations for email field 
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  // Authenticate user and sign-in
  onSubmit() {
    this.error = false;
    this.authService.signIn(this.signinForm.value).subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      err => {
        this.errorList = err;
        this.error = true;
      });
  }
}
