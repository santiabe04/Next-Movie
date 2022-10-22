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

  @Input() result: Movie[] = [];

  @HostBinding('class') classes='row';

  searchText:any = [];

  constructor(private moviesService:MoviesService, private router:Router) {
    
  }

  ngOnInit(): void {

    this.getPlayingNow();
  
  }

  getPlayingNow = () => {
    this.moviesService.getPlayingNow().subscribe( res => {
      this.result = res;
    })
  }
  
  getSearch = () => {
    if(typeof this.searchText == null || (typeof this.searchText === 'string' && this.searchText.trim().length == 0)) {
      this.getPlayingNow();
    }
    else {
      this.moviesService.getSearchResult(this.searchText).subscribe( res => {
        this.result = res;
      })
    }
  }

  selectMovie(idMovie:Number) {
    sessionStorage.setItem('selectedMovie', idMovie.toString());
    this.router.navigateByUrl('/similar');
  }

  selectMovieInfo(idMovie:Number) {
    this.router.navigateByUrl('/movie/'+idMovie);
  }

}
