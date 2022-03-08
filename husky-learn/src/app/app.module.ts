import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormatErrorComponent } from './components/format-error/format-error.component';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// import { AuthInterceptor } from './authservices/authconfig.interceptor';
import { AuthGuard } from './services/authservices/auth.guard';
import { ApiService } from './sharedservices/http-request-custom';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { FavouriteArticlesComponent } from './components/favourite-articles/favourite-articles.component';
import { ViewArticleComponent } from './components/view-article/view-article.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { OtherProfileArticlesComponent } from './components/other-profile-articles/other-profile-articles.component';
import { TagComponent } from './components/tag/tag.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
    FooterComponent,
    FormatErrorComponent,
    NewArticleComponent,
    SettingsComponent,
    PageNotFoundComponent,
    EditArticleComponent,
    ProfileComponent,
    GlobalFeedComponent,
    AddCommentComponent,
    MyArticlesComponent,
    FavouriteArticlesComponent,
    ViewArticleComponent,
    ViewProfileComponent,
    OtherProfileArticlesComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
    AuthGuard,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
