import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Film } from './film';

@Injectable()
export class FilmService {
    private filmsUrl = 'http://localhost:8000/movies';

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});

    update(film: Film): Promise<Film> {
      const url = `${this.filmsUrl}/${film.id}`;
      return this.http
        .put(url, JSON.stringify(film), {headers: this.headers})
        .toPromise()
        .then(() => film)
        .catch(this.handleError);
    }

    create(name: string): Promise<Film> {
        return this.http
            .post(this.filmsUrl, JSON.stringify({name: name}),
            {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
      const url = `${this.filmsUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    getFilms(): Promise<Film[]> {
        return this.http.get(this.filmsUrl)
        .toPromise()
        .then(response => response.json()._embedded.movies as Film[])
        .catch(this.handleError);
    }

    getFilm(id: number): Promise<Film> {
        return this.getFilms()
            .then(films => films.find(film => film.id === id));
    }
}
