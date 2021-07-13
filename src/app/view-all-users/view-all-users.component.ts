import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/UserServiceClient';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent implements OnInit {
  user = {
    _id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    firstNameHide: false,
    lastNameHide:  false,
    emailHide:  false,
    editing: false,
    firstNameEditing: false,
    lastNameEditing:  false,
    emailEditing:  false,
    passwordEditing: false,
  };

  users = [];
  constructor(private service: UserServiceClient) { }

  async ngOnInit(): Promise<void> {
    await this.service.profile()
      .then(profile => this.user = profile);
    await this.service.findAllUsers()
      .then(users => this.users = users);
  }

}
