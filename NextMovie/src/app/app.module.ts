import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SimilarComponent } from './components/similar/similar/similar.component';
import { MovieComponent } from './components/movie/movie/movie.component';
import { FilterComponent } from './components/filter/filter.component';
import { LikedComponent } from './components/filter/liked/liked.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SimilarComponent,
    MovieComponent,
    FilterComponent,
    LikedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
