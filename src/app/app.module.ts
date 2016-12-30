import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilmComponent } from './film/film.component';

import { FilmFormComponent } from './film/film-form.component';

import { FilmService }      from './film/film.service';
import { DirectorComponent } from './director/director.component';
import { DirectorService } from './director/director.service';
import { GenreComponent } from './genre/genre.component';
import { GenreService } from './genre/genre.service';
import { ActorComponent } from './actor/actor.component';
import { ActorService } from './actor/actor.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FilmComponent,
    FilmFormComponent,
    DirectorComponent,
    GenreComponent,
    ActorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
      FilmService,
      ActorService,
      DirectorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
