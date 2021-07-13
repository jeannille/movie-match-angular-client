import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/UserServiceClient';
import {CurateServiceClient} from '../services/CurateServiceClient';
import {OMDBServiceClient} from '../services/OMDBServiceClient';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn = false;

  user = {
    _id: '',
    username: '',
    password: '',
    movies: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    editing: false
  };

  curatedLists = [
    {
      _id: '',
      movieID: '',
      movieObject: {
        Poster: '',
        Title: '',
        Plot: '',
      },
    }
  ];


  // movieId of most recent movie
  // added by user
  movieId = '';

  // fetched Object from omdb
  mostRecentMovie = {
    Title: ''
  };

  myMovieObject = {
    parentList: '',
    value: {},
  };

  isAddingMovie: boolean;
  addMovieId: '';
  addMovieObject: {};
  actualAddedObject: {};

  constructor( private userService: UserServiceClient,
               private curateService: CurateServiceClient,
               private omdbService: OMDBServiceClient,
               ) { }

   // CuratedLists are movieIDs which need
   // to be converted to Objects
   async ngOnInit(): Promise<void> {
    this.isAddingMovie = false;
    await this.isUserLoggedIn();
    await this.getCuratedLists();
    await this.getMostRecentMovie();
  }

  isUserLoggedIn =  async () => {
    // use session to find if user is logged in
    try {
      await this.userService.profile()
        .then(profile => this.user = profile);
    } catch (error) {
      // window.alert(error);
    }
    // create local flag 'loggedIn'
    try {
      if (this.user._id !== undefined) {
        this.loggedIn = true;
      }
    } catch (error) {
      console.log('error');
    }
  }

  getCuratedLists = async () => {
    await this.curateService.getCuratedLists()
      .then(results => this.curatedLists = results);
  }

  deleteFromCuratedList = async (docID) => {
    await this.curateService.deleteFromCuratedList(docID);
    await this.getCuratedLists();
  }

  addToCuratedList = async () => {
    await this.omdbService.fetchMovieByID(this.addMovieId)
      .then(addMovieObject => this.addMovieObject = addMovieObject);
    await this.curateService.addToCuratedList(this.addMovieId, this.addMovieObject)
      .then(actualAddedObject => this.actualAddedObject = actualAddedObject);
    await this.getCuratedLists();
  }


  getMostRecentMovie = async () => {
    try {
      await this.userService.findUserById(this.user._id)
        .then(profile => this.user = profile);
      this.movieId = this.user.movies[this.user.movies.length - 1];
    } catch (error) {
      console.log(error);
    }
    await this.omdbService.fetchMovieByID(this.movieId)
      .then(movieObject => this.mostRecentMovie = movieObject);
  }

}







