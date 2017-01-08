import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Genre } from '../genre/genre';
import { GenreService } from '../genre/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  genres: Genre[] = []

  constructor(private router: Router,
  private genreService: GenreService) { }

  ngOnInit(): void {
      this.genreService.getGenres()
      .subscribe(genres => this.genres = genres);
  }

    gotoDetail(id : number): void {
      this.router.navigate(['/genre/detail', id]);
    }

    gotoAdd(): void {
      this.router.navigate(['/genre/add']);
    }


}
