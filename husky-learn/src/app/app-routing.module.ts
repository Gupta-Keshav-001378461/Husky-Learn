import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from "./services/authservices/auth.guard";
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { FavouriteArticlesComponent } from './components/favourite-articles/favourite-articles.component';
import { ViewArticleComponent } from './components/view-article/view-article.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { TagComponent } from './components/tag/tag.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: "signup", component: SignUpComponent },
  { path: "signin", component: SignInComponent },
  { path: "newarticle", component: NewArticleComponent, canActivate: [AuthGuard] },
  { path: "newarticle/:slug", component: NewArticleComponent, canActivate: [AuthGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
  { path: "editor", component: EditArticleComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "globalfeed", component: GlobalFeedComponent },
  { path: "article", component: ViewArticleComponent },
  { path: "viewprofile/:username", component: ViewProfileComponent },
  { path: "tag",component:TagComponent},
  // {path: "myarticles/:username", component:MyArticlesComponent, canActivate:[AuthGuard]},
  // {path: "favouritearticles/:username",  component:FavouriteArticlesComponent, canActivate:[AuthGuard]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
