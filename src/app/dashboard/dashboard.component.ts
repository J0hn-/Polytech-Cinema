import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Film } from '../film/film';
import { FilmService } from '../film/film.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    films: Film[] = []

  constructor(
      private router: Router,
      private filmService: FilmService) { }

  ngOnInit(): void {
      this.filmService.getFilms()
      .then(films => this.films = films);
  }

    gotoDetail(id : number): void {
      this.router.navigate(['/movie/detail', id]);
    }

    gotoAdd(): void {
      this.router.navigate(['/movie/add']);
    }

}
