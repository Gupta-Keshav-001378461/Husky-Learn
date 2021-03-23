import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../../services/userservices/profile.service'
import { Profile } from 'src/app/model/Profile';

//  Declaring component for Profile page
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username;
  profile;
  showMyArticles;
  Navbarlinks = [
    { path: 'myarticles', label: 'My Articles' },
    { path: 'favouritearticles', label: 'Favourited Articles' }];
  // @Input() username;

  constructor(private profileService: ProfileService, private router: Router) {
    this.profile = null;
  }

  //  Load user profile
  ngOnInit(): void {
    this.profileService.getUser().subscribe(
      data => {
        this.username = data.user.username;
        this.showMyArticles = true;
        this.profileService.getProfiles(this.username).subscribe(
          data => {
            this.profile = data.profile;

            this.showMyArticles = true;
          },
          err => {
            //console.log(err)
          });
      },
      err => {
        //console.log(err)
      });


  }
  // Follow user
  toggleFollow(username, isfollow) {
    if (!isfollow) {
      this.profileService.followUser(username).subscribe(
        data => {
          // this.favorite = true;
          this.listAllProfiles();

        },
        err => {
          this.router.navigate(['/signin']);
        });
    }

    //  Unfollow user
    else if (isfollow) {
      this.profileService.unfollowUser(username).subscribe(
        data => {
          // this.favorite = true;
          this.listAllProfiles();
        },
        err => {
          this.router.navigate(['/signin']);
        });
    }

  }
  // Load list of profiles
  listAllProfiles() {
    this.profileService.getProfiles(this.username).subscribe(
      data => {

        this.profile = data.profile;

      },
      err => {

      });
  }
  decideArticleTab(num) {
    if (num == 1)
      this.showMyArticles = true;
    else if (num == 2)
      this.showMyArticles = false;
  }

}
