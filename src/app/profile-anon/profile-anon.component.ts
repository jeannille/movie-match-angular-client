import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserServiceClient} from '../services/UserServiceClient';

@Component({
  selector: 'app-profile-anon',
  templateUrl: './profile-anon.component.html',
  styleUrls: ['./profile-anon.component.css']
})
export class ProfileAnonComponent implements OnInit {

  // params.subscribe parameter
  userID = '';
  // user Profile of userID
  user = {
    _id: '',
    username: '',
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
  };

  constructor(private route: ActivatedRoute,
              private userService: UserServiceClient,

  ) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
        this.userID = params.userID;
      }
    );
    await this.getUserProfiles();
  }


  getUserProfiles = async () => {
      await this.userService.findUserById(this.userID)
        .then(userDoc => this.user = userDoc);
  }



}
