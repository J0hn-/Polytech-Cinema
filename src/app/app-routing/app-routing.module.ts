import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from '../dashboard/dashboard.component';
import { FilmFormComponent }   from '../film/film-form.component';
import { DirectorComponent }    from '../director/director.component';
import { DirectorFormComponent }    from '../director/director-form.component';
import { GenreComponent }    from '../genre/genre.component';
import { GenreFormComponent }    from '../genre/genre-form.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard',    component: DashboardComponent },
    { path: 'movie/add',    component: FilmFormComponent },
    { path: 'movie/detail/:id',    component: FilmFormComponent },
    { path: 'director',    component: DirectorComponent },
    { path: 'director/add',    component: DirectorFormComponent },
    { path: 'director/detail/:id',    component: DirectorFormComponent },
    { path: 'genre',    component: GenreComponent },
    { path: 'genre/add',    component: GenreFormComponent },
    { path: 'genre/detail/:id',    component: GenreFormComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
