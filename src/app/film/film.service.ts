import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Film } from './film';

@Injectable()
export class FilmService {
    private filmsUrl = 'http://localhost/movies';

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});
    private headersBis =  new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    private toForm(film: Film): string {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('title', film.title);
        urlSearchParams.append('duration', film.duration.toString());
        urlSearchParams.append('release_date', film.release_date);
        urlSearchParams.append('director', film.director ? film.director.id.toString():null);
        urlSearchParams.append('genre', film.genre ? film.genre.id.toString():null);
        return urlSearchParams.toString()
    }

    update(film: Film): Promise<Film> {
      const url = `${this.filmsUrl}/${film.id}`;
      return this.http
        .put(url, this.toForm(film), {headers: this.headersBis})
        .toPromise()
        .then(() => film)
        .catch(this.handleError);
    }

    create(film: Film): Promise<Film> {
        return this.http
            .post(this.filmsUrl, this.toForm(film),
            {headers: this.headersBis})
            .toPromise()
            .then(res => res.json())
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
        .then(response => response.json() as Film[])
        .catch(this.handleError);
    }

    getFilm(id: number): Promise<Film> {
        return this.getFilms()
            .then(films => films.find(film => film.id === id));
    }
}
