import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

import { Director } from './director';

@Injectable()
export class DirectorService {
    private directorsUrl = 'http://localhost/directors';

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});
    private headersBis =  new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    private toForm(director: Director): string {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('first_name', director.first_name);
        urlSearchParams.append('last_name', director.last_name);
        return urlSearchParams.toString()
    }

    update(director: Director): Promise<Director> {
      const url = `${this.directorsUrl}/${director.id}`;
      return this.http
        .put(url, this.toForm(director), {headers: this.headersBis})
        .toPromise()
        .then(() => director)
        .catch(this.handleError);
    }

    create(director: Director): Promise<Director> {
        return this.http
            .post(this.directorsUrl, this.toForm(director),
            {headers: this.headersBis})
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

    getDirectors(): Observable<Director[]> {
        return this.http.get(this.directorsUrl)
        .map((response: Response) => <Director[]> response.json());
    }

    getDirector(id: number): Observable<Director> {
        return this.http.get(`${this.directorsUrl}/${id}`)
        .map((response: Response) => <Director> response.json());
    }
}
