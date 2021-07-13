import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserServiceClient} from './services/UserServiceClient';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchComponent } from './search/search.component';
import { OMDBServiceClient} from './services/OMDBServiceClient';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieServiceClient} from './services/MovieServiceClient';
import {CurateServiceClient} from './services/CurateServiceClient';
import { ProfileAnonComponent } from './profile-anon/profile-anon.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    NavBarComponent,
    SearchComponent,
    SearchDetailsComponent,
    MovieListComponent,
    ProfileAnonComponent,
    ViewAllUsersComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    UserServiceClient,
    OMDBServiceClient,
    MovieServiceClient,
    CurateServiceClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
