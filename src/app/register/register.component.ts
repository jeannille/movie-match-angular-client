// import { Component, OnInit } from '@angular/core';
// import {UserServiceClient} from '../services/UserServiceClient';
// import {Router} from '@angular/router';
//
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//
//   constructor(private router: Router,
//               private service: UserServiceClient) { }
//
//   username = '';
//   password = '';
//   verifyPassword = '';
//
//   register = (username, password) => {
//     console.log(username, password);
//     this.service.register(username, password)
//       .then(actualUser => {
//         // console.log(actualUser)
//         this.router.navigate(['/profile']);
//       });
//   }
//
//   ngOnInit(): void {
//   }
//
// }

import {Component, Input, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/UserServiceClient';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private service: UserServiceClient
  ) {
    this.getSelectedRole();
  }

  username = '';
  password = '';
  verifyPassword = '';
  firstName = '';
  lastName = '';
  email = '';
  role = '';
  radioSelected: string;
  radioSelectedString: string;
  selectedRole: any;
  roles = ['Admin', 'Standard'];

  getSelectedRole() {
    this.selectedRole = this.roles.find(choice => choice === this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.selectedRole);
  }

  register = (username, password, role, firstName, lastName, email) => {
    role = this.selectedRole;
    console.log(username, password, role, firstName, lastName, email);
    this.service.register(username, password, role, firstName, lastName, email)
      .then(actualUser => {
        console.log('USER REGISTERED:', actualUser);
        this.router.navigate(['/profile']);
      });
  };


  ngOnInit(): void {
  }

}
