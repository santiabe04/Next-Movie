import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components Imports */
import { LandingComponent } from './components/landing/landing.component';
import { MovieComponent } from './components/movie/movie.component';
import { SimilarComponent } from './components/similar/similar.component';
import { FilterComponent } from './components/filter/filter.component';
import { LikedComponent } from './components/filter/liked/liked.component';
import { WhichComponent } from './components/filter/which/which.component';

/* Routes */
const routes: Routes = [
  { path:'', component: LandingComponent},
  { path:'landing', component: LandingComponent},
  { path:'similar', component: SimilarComponent},
  { path:'movie/:id', component: MovieComponent},
  { path:'filter', component: FilterComponent, children:[
    { path:'', component: LikedComponent},
    { path:'which', component: WhichComponent}
  ]},
  { path:'**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
