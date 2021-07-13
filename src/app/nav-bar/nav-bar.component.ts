import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/UserServiceClient';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user = {
    _id: '',
    username: null,
    firstName: '',
    lastName: '',
    email: '',
    editing: false
  };

  loggedIn: boolean

  navbarOpen = false;


  constructor(private router: Router,
              private service: UserServiceClient) { }

  async ngOnInit(): Promise<void> {
    this.loggedIn = false
    await this.service.profile()
      .then(profile => this.user = profile)
      .catch(err => console.log(err))
    try {
      if (this.user.username !== undefined) {
        this.loggedIn = true;
      }
    } catch (e) {
        console.log('No user is logged in | NAV BAR');
    }
  }

  logout = () =>
    this.service.logout()
      .then(status => this.router.navigate(['/home']))



  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }



}
