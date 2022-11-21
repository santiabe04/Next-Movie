import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.css']
})
export class LikedComponent implements OnInit {

  @Input() result: any = [];

  @HostBinding('class') classes='row';

  idMovie:any;

  constructor(private router:Router,private moviesService:MoviesService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idMovie = sessionStorage.getItem('selectedMovie');
    this.getMovie();
  }

  /* Service's Response to Movie Petition */
  getMovie() {
    this.moviesService.getMovieById(this.idMovie).subscribe( res => {
      this.result = res.poster_path;
    });
  }

  /* Returns Movie Poster */
  getImage() {
    return this.result;
  }

  /* Re-routes to Similar Movies Page */
  goToSelectedFilter(selected:number) {
    sessionStorage.setItem('selectedMovie', this.idMovie.toString());
    
    if(selected == 1){
      sessionStorage.setItem('whichFilter', '1');
    };
    if(selected == 2){
      sessionStorage.setItem('whichFilter', '2');
    };
    if(selected == 3){
      sessionStorage.setItem('whichFilter', '3');
    };
    this.router.navigateByUrl('filter/which');
  }

}
