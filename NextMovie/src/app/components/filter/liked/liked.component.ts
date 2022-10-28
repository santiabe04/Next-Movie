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

  getMovie() {
    this.moviesService.getMovieById(this.idMovie).subscribe( res => {
      this.result = res.poster_path;
    });
  }

  getImage() {
    return this.result;
  }

  goToSelectedFilter(selected:number) {
    sessionStorage.setItem('selectedMovie', this.idMovie.toString());
    this.router.navigateByUrl('/similar');
  }

}
