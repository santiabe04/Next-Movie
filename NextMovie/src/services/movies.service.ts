import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cast, MovieCreditsModel } from 'src/models/MovieCreditsModel';
import { MovieModel } from 'src/models/MovieModel';
import { Movie, MoviesResult } from 'src/models/MoviesResult';
import { MovieStreamsModel } from 'src/models/MovieStreamsModel';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http:HttpClient) { }

  getPlayingNow():Observable<Movie[]> {

    return this.http.get<MoviesResult>('https://api.themoviedb.org/3/movie/now_playing?api_key=6dd700e2484582ba5b7d8205c9767990&language=es-ES&page=1').pipe(
      map( (res) => res.results )
    );
  }

  getSearchResult(search:String) {
    let searchHelper = search.split(' ');
    let searchText:string = '';
    for(let i = 0; i < searchHelper.length; i++) {
      if(searchHelper.length != (i + 1)) {
        searchText = searchText.concat(searchHelper[i].toString());
        searchText = searchText.concat('%20');
      }
      else {
        searchText = searchText.concat(searchHelper[i].toString());
      }
    }

    return this.http.get<MoviesResult>('https://api.themoviedb.org/3/search/movie?api_key=6dd700e2484582ba5b7d8205c9767990&language=es-Es&query='+ searchText +'&page=1&include_adult=false').pipe(
      map( (res) => res.results )
    );
  }

  getSimilarMovieById(id:string) {
    return this.http.get<MoviesResult>('https://api.themoviedb.org/3/movie/'+id+'/similar?api_key=6dd700e2484582ba5b7d8205c9767990&language=es-Es&page=1').pipe(
      map( (res) => res.results )
    );
  }

  getMovieById(id:string) {
    return this.http.get<MovieModel>('https://api.themoviedb.org/3/movie/'+id+'?api_key=6dd700e2484582ba5b7d8205c9767990&language=es-ES').pipe(
      map( (res) => res )
    );
  }

  getMovieDetailsCrew(id:string) {
    return this.http.get<MovieCreditsModel>(' https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=6dd700e2484582ba5b7d8205c9767990&language=es-ES').pipe(
      map( (res) => res.crew )
    );
  }

  getMovieDetailsCast(id:string) {
    return this.http.get<MovieCreditsModel>(' https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=6dd700e2484582ba5b7d8205c9767990&language=es-ES').pipe(
      map( (res) => res.cast )
    );
  }

  getMovieStreamPlattforms(id:string) {
    return this.http.get<MovieStreamsModel>(' https://api.themoviedb.org/3/movie/'+id+'/watch/providers?api_key=6dd700e2484582ba5b7d8205c9767990').pipe(
      map( (res) => res.results.AR )
    );
  }
}