import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/models/MoviesResult';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {

  @Input() result: Movie[] = [];

  @HostBinding('class') classes='row';

  idMovie:string = (sessionStorage.getItem('selectedMovie') || '');

  constructor(private moviesService:MoviesService, private router:Router) { }

  ngOnInit(): void {
    if(this.idMovie != '') {
      this.getSimilar();
    }
    else {
      //TO DO MANAGE ERRORS
    };
  }

  /* Service's Response to Similar Movies Petition */
  getSimilar = () => {
    this.moviesService.getSimilarMovieById(this.idMovie).subscribe( res => {
      this.result = res;
    })
  }

  /* Re-routes to Movie's Data Page */
  selectMovieInfo(idMovie:Number) {
    this.router.navigateByUrl('/movie/'+idMovie);
  }
}
