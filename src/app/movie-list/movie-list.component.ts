import {Component, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/UserServiceClient';
import {OMDBServiceClient} from '../services/OMDBServiceClient';
import {ActivatedRoute} from '@angular/router';
import {MovieServiceClient} from '../services/MovieServiceClient';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  user = {
    _id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    editing: false,
    movies: [],
    password: '',
  };

  movieObjectsList = [];

  user2 = {
    _id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    editing: false,
    movies: [],
    password: '',
  };

  userId = '';


  constructor(private userservice: UserServiceClient,
              private omdbService: OMDBServiceClient,
              private movieService: MovieServiceClient,
              private route: ActivatedRoute) {}


  async ngOnInit(): Promise<void> {
    await this.route.params.subscribe(params => {
      this.userId = params.uid;
    });
    await this.findUserById();
    await this.fetchMovieByID();
  }

  findUserById = async () => {
    await this.userservice.findUserById(this.userId)
      .then(actualUser => this.user = actualUser);
  }

  fetchMovieByID = async () => {
    for (const movieId of this.user.movies) {
      await this.omdbService.fetchMovieByID(movieId)
        .then(movieDocument => this.movieObjectsList.push(movieDocument));
    }
    console.log(this.movieObjectsList);
  }

  afterDeleteUpdateMovieList = async () => {
    this.movieObjectsList = [];
    await this.fetchMovieByID();
  }

  deleteFromMovieDetails = async (movieID) => {
    await this.movieService.updateMovieDetailsRemoveUser(movieID, this.user._id)
      .then(updatedMovieDetails => console.log(updatedMovieDetails));
  }

  deleteFromMovieList = async (movieID) => {
      const newEdits = {movies: movieID};
      await this.userservice.deleteMovie(this.user._id, newEdits)
        .then(updatedUser => this.user = updatedUser);
      await this.afterDeleteUpdateMovieList();
      await this.deleteFromMovieDetails(movieID);
  }

}
