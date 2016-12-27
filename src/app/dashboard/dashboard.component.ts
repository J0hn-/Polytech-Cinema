import { Component, OnInit } from '@angular/core';

import { Film } from '../film/film';
import { FilmService } from '../film/film.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    films: Film[] = []

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
      this.filmService.getFilms()
      .then(films => this.films = films.slice(0,4));
  }

}
