import {Injectable} from '@angular/core';


@Injectable()
export class UserServiceClient {

  // for updating only the user's "movies" array
  update = (userId, newEdits) =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/update/` + userId, {
      method: 'PUT',
      body: JSON.stringify(newEdits),
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))

  deleteMovie = (userId, newEdits) =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/deleteMovie/` + userId, {
      method: 'PUT',
      body: JSON.stringify(newEdits),
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))

  // for updating all other attributes of user profile (except movies array)
  updateProfile = (userId, newEdits) =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/updateProfile/` + userId, {
      method: 'PUT',
      body: JSON.stringify(newEdits),
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))

  findUserById = (userId) =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/findUserById/` + userId, {
      method: 'POST',
      body: JSON.stringify({userId}),
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))

  logout = () =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/logout`, {
      method: 'POST',
      credentials: 'include'
    }).catch(err => console.log(err))


  profile = async () =>
    await fetch(`https://movie-match-nodejs-server.herokuapp.com/profile`, {
      method: 'POST',
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))


  login = (username, password) =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/login`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))


  register = (username, password, role, firstName, lastName, email) =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/register`, {
      method: 'POST',
      body: JSON.stringify({username, password, role, firstName, lastName, email}),
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err));


  findAllUsers = () =>
    fetch('https://movie-match-nodejs-server.herokuapp.com/api/users')
      .then(response => response.json())

}
