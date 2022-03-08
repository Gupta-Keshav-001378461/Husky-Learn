import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/userservices/profile.service';
import { Router, ActivatedRoute } from '@angular/router';

// Declaring component to view profile
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  username;
  profile;
  showMyArticles;
  Navbarlinks = [
    { path: 'otherprofilearticles', label: 'My Articles' },
    { path: 'favouritearticles', label: 'Favourited Articles' }];
  // @Input() username;

  constructor(private profileService: ProfileService, private router: Router, private route: ActivatedRoute, ) {
    this.profile = null;
  }

  // Load profile of particular username
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username')

      this.profileService.getProfiles(this.username).subscribe(
        data => {
          this.profile = data.profile;
          console.log(data)
          this.showMyArticles = true;
          console.log(this.username)
        },
        err => {
          //console.log(err)
        });


    });


  }

  // Follow a user
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

    // Unfollow a user
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