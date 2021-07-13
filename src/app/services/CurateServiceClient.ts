import {Injectable} from '@angular/core';

@Injectable()
export class CurateServiceClient {

  getCuratedLists = () =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/curate/` , {
      method: 'GET',
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))

  deleteFromCuratedList  = ( docID ) =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/curate/delete/` + docID  , {
      method: 'DELETE',
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))

  addToCuratedList  = (movieID, movieObject ) =>
    fetch(`https://movie-match-nodejs-server.herokuapp.com/curate/create/`   , {
      method: 'POST',
      body: JSON.stringify({movieID, movieObject}),
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .catch(err => console.log(err))

}
