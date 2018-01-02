import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  private loggedIn = false;
  private authUrl = 'http://localhost:8080/auth';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  login(username: string, password: string): Observable<boolean> {
      return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
          .map((response: Response) => {
              // login successful if there's a jwt token in the response
              const token = response.json() && response.json().token;
              if (token) {
                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                  this.loggedIn = true;
                  // return true to indicate successful login
                  return true;
              } else {
                  // return false to indicate failed login
                  return false;
              }
          }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getToken(): String {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    return token ? token : '';
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    // const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    // return Date.now() < expiresAt;
    return this.loggedIn;
  }
}
