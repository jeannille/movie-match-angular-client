import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {SearchComponent} from './search/search.component';
import {SearchDetailsComponent} from './search-details/search-details.component';
import {MovieListComponent} from './movie-list/movie-list.component';
import {ProfileAnonComponent} from './profile-anon/profile-anon.component';
import {ViewAllUsersComponent} from './view-all-users/view-all-users.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:searchText', component: SearchComponent},
  {path: 'details/:movieID', component: SearchDetailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'movielist/:uid', component: MovieListComponent},
  // do NOT delete this second iteration of HomeComponent allows page to refresh when user logs out
  {path: 'home', component: HomeComponent},
  {path: 'profile/:userID', component: ProfileAnonComponent},
  {path: 'viewAllUsers', component: ViewAllUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
