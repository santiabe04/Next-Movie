import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-which',
  templateUrl: './which.component.html',
  styleUrls: ['./which.component.css']
})

export class WhichComponent implements OnInit {

  @HostBinding('class') classes='row';

  @Input() result: any = [];

  actors:any=[];

  directors:any=[];

  whichFilterID:string = (sessionStorage.getItem('whichFilter') || '');

  idMovie:string = (sessionStorage.getItem('selectedMovie') || '');

  constructor(private moviesService:MoviesService, private router:Router) { }

  ngOnInit(): void {
    if(this.whichFilterID != '' && this.idMovie != '') {
      if(this.whichFilterID == '1'){
        this.getGenres();
      }
      if(this.whichFilterID == '2'){
        this.getActors();
      }
      if(this.whichFilterID == '3'){
        this.getDirectors();
      }
    }
    else {
      //TO DO MANAGE ERRORS
    };
  }

  getSimilar(id:number){
    if(this.whichFilterID == '1'){
      sessionStorage.setItem('selectedGenre', id.toString());
      this.router.navigateByUrl('similar');
    };
    if(this.whichFilterID == '2'){
      sessionStorage.setItem('selectedActor', id.toString());
      this.router.navigateByUrl('similar');
    };
    if(this.whichFilterID == '3'){
      sessionStorage.setItem('selectedDirector', id.toString());
      this.router.navigateByUrl('similar');
    };
  }

  /* Service's Response to Filter Genres Data Petition */
  getGenres(){
    this.moviesService.getMovieById(this.idMovie).subscribe( res => {
      this.result = res.genres;
    });
  }

  /* Service's Response to Filter Actors Data Petition */
  getActors(){
    this.moviesService.getMovieDetailsCast(this.idMovie).subscribe ( res => {
      this.result = res;
      this.setActorsArray();
    });

    this.result = this.actors;
  }

  setActorsArray() {
    for(let i = 0; i < this.result.length; i++) {
      if(this.result[i]['known_for_department'] === 'Acting') {
        this.actors.push(this.result[i]);
      };
    };
  }

  /* Service's Response to Filter Directors Data Petition */
  getDirectors(){
    this.moviesService.getMovieDetailsCrew(this.idMovie).subscribe ( res => {
      this.result = res;
      this.setDirectorsArray();
    });

    this.result = this.directors;
  }

  setDirectorsArray() {
    for(let i = 0; i < this.result.length; i++) {
      if(this.result[i]['known_for_department'] === 'Directing') {
        this.directors.push(this.result[i]);
      };
    };
  }

  returnPhoto(photo:any) {
    if(photo != null) {
      return 'http://image.tmdb.org/t/p/w500'+photo;
    }
    else {
      return '../../../../assets/images_icons/no_photo.jpg';
    }
  }
}