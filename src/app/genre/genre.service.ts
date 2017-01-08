import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Genre } from './genre';

@Injectable()
export class GenreService {
    private genresUrl = 'http://localhost/genres';

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});
    private headersBis =  new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    private toForm(genre: Genre): string {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('title', genre.title);
        return urlSearchParams.toString()
    }

    update(genre: Genre): Promise<Genre> {
      const url = `${this.genresUrl}/${genre.id}`;
      return this.http
        .put(url, this.toForm(genre), {headers: this.headersBis})
        .toPromise()
        .then(() => genre)
        .catch(this.handleError);
    }

    create(genre: Genre): Promise<Genre> {
        return this.http
            .post(this.genresUrl, this.toForm(genre),
            {headers: this.headersBis})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
      const url = `${this.genresUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    getGenres(): Observable<Genre[]> {
        return this.http.get(this.genresUrl)
        .map((response: Response) => <Genre[]> response.json());
    }

    getGenre(id: number): Observable<Genre> {
        return this.http.get(`${this.genresUrl}/${id}`)
        .map((response: Response) => <Genre> response.json());
    }
}
