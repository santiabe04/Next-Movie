import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { SimilarComponent } from './components/similar/similar/similar.component';

const routes: Routes = [
  { path:'', component: LandingComponent},
  { path:'landing', component: LandingComponent},
  { path:'similar', component: SimilarComponent},
  { path:'**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
