import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Director } from './director';

@Injectable()
export class DirectorService {
    private directorsUrl = 'http://localhost:8080/directors';

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});

    update(director: Director): Promise<Director> {
      const url = `${this.directorsUrl}/${director.id}`;
      return this.http
        .put(url, JSON.stringify(director), {headers: this.headers})
        .toPromise()
        .then(() => director)
        .catch(this.handleError);
    }

    create(name: string): Promise<Director> {
        return this.http
            .post(this.directorsUrl, JSON.stringify({name: name}),
            {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
      const url = `${this.directorsUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    getDirectors(): Promise<Director[]> {
        return this.http.get(this.directorsUrl)
        .toPromise()
        .then(response => response.json()._embedded.movies as Director[])
        .catch(this.handleError);
    }

    getDirector(id: number): Promise<Director> {
        return this.getDirectors()
            .then(directors => directors.find(director => director.id === id));
    }
}
