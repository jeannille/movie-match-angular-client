import {Component, OnInit} from '@angular/core';
import {OMDBServiceClient} from '../services/OMDBServiceClient';
import {ActivatedRoute} from '@angular/router';
import {MovieServiceClient} from '../services/MovieServiceClient';
import {UserServiceClient} from '../services/UserServiceClient';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {
  // imdbID taken route.params.subscribe
  movieID = '';
  // omdb returned movie object
  movie = {
    Title: '',
    Year: '',
    Rated: '',
    Released: '',
    Runtime: '',
    Genre: '',
    Director: '',
    Writer: '',
    Actors: '',
    Plot: '',
    Language: '',
    Country: '',
    Awards: '',
    Poster: '',
    Ratings: [
      {
        Source: '',
        Value: '',
      },
      {
        Source: '',
        Value: '',
      },
      {
        Source: '',
        Value: '',
      }
    ],
    Metascore: '',
    imdbRating: '',
    imdbVotes: '',
    imdbID: '',
    Type: '',
    DVD: '',
    BoxOffice: '',
    Production: '',
    Website: '',
    Response: '',
  };
  // details from database
  movieMatchDetails = {
    movieId: '',
    usersThatAddedMovie: [],
    numTimesAdded: 0,
    _id: '',
  };
  // user profile
  user = {
    _id: '',
    username: '',
    password: '',
    movies: '',
    firstName: '',
    lastName: '',
    email: '',
  };
  // list of user Profile Objects
  userProfiles = [];

  isLoggedIn = '';

  constructor(private omdbService: OMDBServiceClient,
              private movieServiceClient: MovieServiceClient,
              private userService: UserServiceClient,
              private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
        this.movieID = params.movieID;
      }
    );
    // fetch movie details from OMDB
    await this.fetchMovieById();
    // fetch movie details from our own database
    await this.getMovieMatchDetails();
    // fetch userProfiles of user who added this movie
    await this.getUserProfiles();
  }

  fetchMovieById = async () => {
    await this.omdbService.fetchMovieByID(this.movieID)
      .then(movieDocument => this.movie = movieDocument);
  }
  getMovieMatchDetails = async () => {
    await this.movieServiceClient.getMovieMatchDetails(this.movieID)
      .then(doc => this.movieMatchDetails = doc);
  }

  getUserProfiles = async () => {
    for (const userId of this.movieMatchDetails.usersThatAddedMovie) {
      await this.userService.findUserById(userId)
        .then(userDoc => this.userProfiles.push(userDoc));
    }
  }


  /*
   * Add Button
   */
  Add = async () => {
    // check if user is logged in
    try {
      await this.userService.profile()
        .then(profile => this.user = profile);
      console.log(this.user._id);
    } catch (error) {
      window.alert('You must sign in to use this feature.');
    }
    // user is logged in -- continue to add movie to details list
    await this.updateMovieDetailsAddUser();
    await this.updateUserMovieList();
    await this.addMostRecentUser();
  }

  // Add current user to the list of users who recently added this movie
  updateMovieDetailsAddUser = async () => {
    await this.movieServiceClient.updateMovieDetailsAddUser(this.movieID, this.user._id)
      .then(doc => this.movieMatchDetails = doc);
  }

  // Update the user's MovieList
  updateUserMovieList = async () => {
    await this.userService.update(this.user._id, {movies: this.movie.imdbID})
      .then(actualUser => {
        if (actualUser !== undefined || null) {
          window.alert('Movie added to ' + this.user.username + ' MovieList');
        }
      });
  }

  addMostRecentUser = async () => {
      const indexOfMostRecentUser = this.movieMatchDetails.usersThatAddedMovie.length - 1;
      await this.userService.findUserById(this.movieMatchDetails.usersThatAddedMovie[indexOfMostRecentUser])
        .then(userDoc => this.userProfiles.push(userDoc));
  }


}


