import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {

  @Input() result:any = [];

  @HostBinding('class') classes='row';

  idMovie:string = (sessionStorage.getItem('selectedMovie') || '');

  whichFilterID:string = (sessionStorage.getItem('whichFilter') || '');

  idFilter:string = '';

  constructor(private moviesService:MoviesService, private router:Router) { }

  ngOnInit(): void {
    if(this.idMovie != '' && this.whichFilterID != '') {
      this.getSimilar();
    }
    else {
      //TO DO MANAGE ERRORS
    };
  }

  /* Service's Response to Similar Movies Petition */
  getSimilar = () => {
    if(this.whichFilterID == '1'){
      this.idFilter = (sessionStorage.getItem('selectedGenre') || '');
      this.moviesService.getSimilarByGenre(this.idFilter).subscribe( res => {
        this.result = res;
      })
    }
    if(this.whichFilterID == '2'){
      this.idFilter = (sessionStorage.getItem('selectedActor') || '');
      // this.moviesService.getSimilarByActor(this.idFilter).subscribe( res => {
      //   this.result = res;
      // })
      /* This is temporal until we solve the problem */
      this.moviesService.getSimilarMovieById(this.idMovie).subscribe( res => {
        this.result = res;
      })
    }
    if(this.whichFilterID == '3'){
      this.idFilter = (sessionStorage.getItem('selectedDirector') || '');
      this.moviesService.getSimilarByDirector(this.idFilter).subscribe( res => {
        this.result = res;
      })
    }

    // this.moviesService.getSimilarMovieById(this.idMovie).subscribe( res => {
    //   this.result = res;
    // })
  }

  /* Re-routes to Movie's Data Page */
  selectMovieInfo(idMovie:Number) {
    this.router.navigateByUrl('/movie/'+idMovie);
  }
}
