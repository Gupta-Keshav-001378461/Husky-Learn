import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/authservices/auth.service";
import { Observable } from 'rxjs';

import { User } from 'src/app/model/User';
import { ProfileService } from 'src/app/services/userservices/profile.service';
import { FormGroup, FormBuilder } from '@angular/forms';

// Declaring component for nav-bar
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  username = "";
  Navbarlinks = [
    { path: 'home', label: 'Home' },
    { path: 'tag',label:'Tags'},
    { path: 'signin', label: 'Sign in' },
    { path: 'signup', label: 'Sign up' }];

  LoggedInNavbarlinks = [
    { path: 'home', label: 'Home' },
    { path: 'tag',label:'Tags'},
    { path: 'newarticle', label: 'New Article' },
    { path: 'settings' + this.username, label: 'Settings' },
    { path: 'profile', label: 'Profile' }

  ];
  links;
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;



  constructor(private authService: AuthService, private fb: FormBuilder, private profileService: ProfileService) {
    this.links = this.Navbarlinks;
    // this.settingsForm = this.fb.group({
    //   username: this.username
    // });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    // this.profileService.getUser().subscribe(
    //   data => {

    //   this.username=data.user.username;
    //   const result = this.LoggedInNavbarlinks.find( ({ label }) => label === 'Settings' );
    //   result.path = 'settings';
    //   },
    //   err => {
    //   //console.log(err)
    //   });
  }
}
