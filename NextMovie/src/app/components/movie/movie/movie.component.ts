import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/services/movies.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() result: any = [];

  @Input() resultCrew: any = [];

  @Input() resultCast: any = [];

  @Input() resultStream: any = [];

  @HostBinding('class') classes='row';

  idMovie:any;

  directors:any = [];

  genres:any = [];

  actors:any=[];

  plattforms:any = [];

  noStream:boolean = false;

  rating:number = 0;

  stars:number = 0;

  starsList:any = [];

  starsEmpty:number = 0;

  starsEmptyList:any = [];

  starsHalf:number = 0;

  starsHalfList:any = [];

  runTime:number = 0;

  runTimeFixed:string = '0';

  constructor(private moviesService:MoviesService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idMovie = this.activatedRoute.snapshot.params['id'];
    if(this.idMovie != '') {
      this.getMovie();
    }
    else {
      //TO DO MANAGE ERRORS
    }
  }

  getMovie() {
    this.moviesService.getMovieById(this.idMovie).subscribe( res => {
      this.result = res;
      this.getGenres();
      this.getRating();
      this.getRunTime();
    });
    this.moviesService.getMovieDetailsCrew(this.idMovie).subscribe ( res => {
      this.resultCrew = res;
      this.getDirectors();
    });
    this.moviesService.getMovieDetailsCast(this.idMovie).subscribe ( res => {
      this.resultCast = res;
      this.getActors();
    });
    this.moviesService.getMovieStreamPlattforms(this.idMovie).subscribe ( res => {
      this.resultStream = res;
      if(this.resultStream != null) {
        this.getPlattforms();
      }
      else {
        this.noStream = true;
      };
    });
  }

  getImage() {
    return this.result['poster_path'];
  }

  getDirectors() {
    for(let i = 0; i < this.resultCrew.length; i++) {
      if(this.resultCrew[i]['job'] === 'Director') {
        this.directors.push(this.resultCrew[i]['name']);
      };
    };
  }

  returnDirectors() {
    return this.directors.join(', ');
  }

  getGenres() {
    for(let i = 0; i < this.result['genres'].length; i++) {
      this.genres.push(this.result['genres'][i]['name']);
    };
  }

  returnGenres() {
    return this.genres.join(', ');
  }

  getActors() {
    for(let i = 0; i < this.resultCast.length; i++) {
      if(this.resultCast[i]['known_for_department'] === 'Acting') {
        this.actors.push(this.resultCast[i]['profile_path']);
      };
    };
  }

  getPlattforms() {
    if(this.resultStream['buy']) {
      for(let i = 0; i < this.resultStream['buy'].length; i++) {
        this.plattforms.push(this.resultStream['buy'][i]['logo_path']);
      };
    };
    if(this.resultStream['flatrate']) {
      for(let i = 0; i < this.resultStream['flatrate'].length; i++) {
        this.plattforms.push(this.resultStream['flatrate'][i]['logo_path']);
      };
    };
    if(this.resultStream['rent']) {
      for(let i = 0; i < this.resultStream['rent'].length; i++) {
        this.plattforms.push(this.resultStream['rent'][i]['logo_path']);
      };
    };
    if(this.resultStream['ads']) {
      for(let i = 0; i < this.resultStream['ads'].length; i++) {
        this.plattforms.push(this.resultStream['ads'][i]['logo_path']);
      };
    };
  }

  getRating() {
    console.log(this.result['vote_average']);
    this.rating = this.result['vote_average'] / 2;
    this.stars = Math.floor(this.rating);
    if((this.rating - this.stars) > 0.5) {
      this.starsHalf = 1;
    }
    this.starsEmpty = 5 - this.stars - this.starsHalf;
    
    for(let i = 0; i < this.stars; i++) {
      this.starsList.push(i);
    }

    for(let i = 0; i < this.starsHalf; i++) {
      this.starsHalfList.push(i);
    }

    for(let i = 0; i < this.starsEmpty; i++) {
      this.starsEmptyList.push(i);
    }
  }

  getRunTime() {
    this.runTime = this.result['runtime'];
    let hours = ~~(this.runTime / 60);
    let minutes = ~~(((this.runTime / 60) - hours) * 60);
    this.runTimeFixed = hours.toString() + 'hs  ' + minutes.toString() + 'mins';
  }

}
