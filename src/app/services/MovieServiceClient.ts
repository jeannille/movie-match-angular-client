import {Injectable} from '@angular/core';


@Injectable()
export class MovieServiceClient {

  getMovieMatchDetails = (mId) =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/details/` + mId, {
      method: 'POST',
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))

  updateMovieDetailsAddUser = (mId, uId) =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/details/` + mId + `/update`, {
      method: 'POST',
      body: JSON.stringify({uId}),
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))

  updateMovieDetailsRemoveUser = (mId, uId) =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/details/` + mId + `/remove`, {
      method: 'POST',
      body: JSON.stringify({uId}),
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))

}
