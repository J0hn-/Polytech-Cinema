import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Director } from '../director/director';
import { DirectorService } from '../director/director.service';


@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  directors: Director[] = []

  constructor(private router: Router,
  private directorService: DirectorService) { }

  ngOnInit(): void {
      this.directorService.getDirectors()
      .subscribe(directors => this.directors = directors);
  }

    gotoDetail(id : number): void {
      this.router.navigate(['/director/detail', id]);
    }

    gotoAdd(): void {
      this.router.navigate(['/director/add']);
    }

}
