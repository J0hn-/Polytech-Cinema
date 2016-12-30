import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Actor } from './actor';

@Injectable()
export class ActorService {
    private actorsUrl = 'http://localhost:8080/actors';

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});

    update(actor: Actor): Promise<Actor> {
      const url = `${this.actorsUrl}/${actor.id}`;
      return this.http
        .put(url, JSON.stringify(actor), {headers: this.headers})
        .toPromise()
        .then(() => actor)
        .catch(this.handleError);
    }

    create(name: string): Promise<Actor> {
        return this.http
            .post(this.actorsUrl, JSON.stringify({name: name}),
            {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
      const url = `${this.actorsUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    getActors(): Promise<Actor[]> {
        return this.http.get(this.actorsUrl)
        .toPromise()
        .then(response => response.json()._embedded.movies as Actor[])
        .catch(this.handleError);
    }

    getActor(id: number): Promise<Actor> {
        return this.getActors()
            .then(actors => actors.find(actor => actor.id === id));
    }
}
