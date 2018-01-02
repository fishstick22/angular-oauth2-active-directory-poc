import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
// import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
// import { AuthenticationService } from './authentication.service';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { AuthService } from './auth.service';

@Injectable()
export class RestService {
  private heroesUrl = ' http://localhost:8080/heroes';  // URL to web api

  private headers = new Headers({
    'Content-Type': 'application/json',
    // 'Authorization': 'Basic ' + btoa('user:2aea7f2e-be34-44f2-8eff-54319338f89c')
    // 'Authorization': 'Basic ' + btoa('aburkholder:DrewBert1')
      'Authorization': 'Bearer ' + this.authService.getToken()
    });

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl, {headers: this.headers})
               .toPromise()
               .then(response => response.json()._embedded.heroes as Hero[])
               .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
