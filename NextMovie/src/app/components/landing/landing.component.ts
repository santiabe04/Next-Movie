import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/models/MoviesResult';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  @Input() result:any = [];

  @HostBinding('class') classes='row';

  searchText:any = [];

  resultEmpty:boolean = true;

  showBody:any = [];

  constructor(private moviesService:MoviesService, private router:Router) {
    
  }

  ngOnInit(): void {
  
  }
  
  getSearch = () => {
    if(typeof this.searchText != null && (typeof this.searchText === 'string' && this.searchText.trim().length != 0)) {
      this.moviesService.getSearchResult(this.searchText).subscribe( res => {
        this.result = res;
        for(let i = 0; i < this.result.length; i++) {
          this.showBody.push([this.result[i]['id'],false]);
        }
      })
      this.resultEmpty = false;
    }
    else {
      this.resultEmpty = true;
    }
  }

  selectMovie(idMovie:Number) {
    sessionStorage.setItem('selectedMovie', idMovie.toString());
    this.router.navigateByUrl('/filter');
  }

  selectMovieInfo(idMovie:Number) {
    this.router.navigateByUrl('/movie/'+idMovie);
  }

  mouseOver(id:any) {
    for (var i=0; i < this.showBody.length; i++) {
      if (this.showBody[i][0] === id) {
        this.showBody[i][1] = true;
      }
    }
  }

  mouseOut(id:any) {
    for (var i=0; i < this.showBody.length; i++) {
      if (this.showBody[i][0] === id) {
        this.showBody[i][1] = false;
      }
    }
  }

  getShowBody(id:any) {
    for (var i=0; i < this.showBody.length; i++) {
      if (this.showBody[i][0] === id) {
        return this.showBody[i][1];
      }
    }
  }

}
