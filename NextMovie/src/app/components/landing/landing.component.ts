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
    
    var input = document.getElementById("search-input");
    if (input != null){ 
	    input.addEventListener("keypress", function(event) {
  	    if (event.key === "Enter") {
    			event.preventDefault();
    			var button = document.getElementById("search-button");
    			if (button != null) button.click();
  		  }
	    });
	  }
  }
  
  /* Service's Response to Searched Movie */
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

  /* Re-routes to Filters Page */
  selectMovie(idMovie:Number) {
    sessionStorage.setItem('selectedMovie', idMovie.toString());
    this.router.navigateByUrl('/filter');
  }

  /* Re-routes to Movie Data Page */
  selectMovieInfo(idMovie:Number) {
    this.router.navigateByUrl('/movie/'+idMovie);
  }

  /* Reaction to Mouse Over Movie Card */
  mouseOver(id:any) {
    for (var i=0; i < this.showBody.length; i++) {
      if (this.showBody[i][0] === id) {
        this.showBody[i][1] = true;
      }
    }
  }

  /* Reaction to Mouse Out Movie Card */
  mouseOut(id:any) {
    for (var i=0; i < this.showBody.length; i++) {
      if (this.showBody[i][0] === id) {
        this.showBody[i][1] = false;
      }
    }
  }

  /* Returns Card Visibility Status */
  getShowBody(id:any) {
    for (var i=0; i < this.showBody.length; i++) {
      if (this.showBody[i][0] === id) {
        return this.showBody[i][1];
      }
    }
  }

  returnPhoto(photo:any) {
    if(photo != null) {
      return 'http://image.tmdb.org/t/p/w500'+photo;
    }
    else {
      return '../../../assets/images_icons/no_photo.jpg';
    }
  }
}
