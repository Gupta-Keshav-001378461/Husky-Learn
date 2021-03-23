import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authservices/auth.service';
import { ProfileService } from '../../services/userservices/profile.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

// Declaring article for Settings page
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: any;
  error = false;
  errorList;
  currentUser: any;
  username = null;
  hide= true;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private authService: AuthService, private route: ActivatedRoute, private profileService: ProfileService, private router: Router) {
    this.username = null;
    this.currentUser = null;
  }

  // Load settings page
  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      image: new FormControl(""),
      username: new FormControl(""),
      bio: new FormControl(""),
      email: this.email,
      password: new FormControl("")
    })

    // Add / Edit image,username,bio,email,password of user
    this.currentUser = {};
    this.profileService.getUser().subscribe(
      data1 => {
        this.currentUser.email = data1.user.email;
        this.currentUser.username = data1.user.username;
        this.profileService.getProfiles(this.currentUser.username).subscribe(
          data => {
            this.currentUser.username = data.profile.username;
            this.currentUser.image = data.profile.image;
            this.currentUser.bio = data.profile.bio;
            this.settingsForm = new FormGroup({
              image: new FormControl(this.currentUser.image),
              username: new FormControl(this.currentUser.username),
              bio: new FormControl(this.currentUser.bio),
              email: new FormControl(this.currentUser.email,[Validators.required, Validators.email]),
              password: new FormControl(this.currentUser.password)
            });

          },
          err => {
          });
      },
      err => {
      });



  }
  onSubmit() {
    // Check if username field is empty
    if (this.username != null) {
      this.profileService.updateUser(this.username, this.settingsForm.value).subscribe(
        data => {
          this.router.navigate(['/profile'], { state: data });
          //this.router.navigate(['/editor'],{state : data});
        },
        err => {
          this.errorList = err;
          this.error = true;
        });
    }
    // update settings for user
    else {
      this.profileService.updateUser(this.username, this.settingsForm.value).subscribe(
        data => {

          this.router.navigate(['/profile'], { state: data });
        },
        err => {
          this.errorList = err;
          this.error = true;
        });
    }

  }



  // Function for logout 
  logout() {
    this.authService.logout();
  }




}
