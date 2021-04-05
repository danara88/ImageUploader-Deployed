import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl = environment.apiUrlProd;
  public token: string;
  public identity: User;

  constructor( private http: HttpClient, private router: Router ) { }

  getToken(): string {
    let token = localStorage.getItem('token');
    if ( token === 'undefined' ) {
      this.token = null;
    } else {
      this.token = token;
    }
    return this.token;
  }

  getIdentity(): User {
    let identity = JSON.parse(localStorage.getItem('identity'));
    if ( identity === 'undefined' ) {
      this.identity = null;
    } else {
      this.identity = identity;
    }
    return this.identity;

  }

  signOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  register(user: User): Observable<User> {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(`${ this.apiUrl }users/register`, params, {headers})
        .pipe( map((resp: any) => resp.user) );
  }

  login(user: User): Observable<any> {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${ this.apiUrl }users/login`, params, {headers});
  }

}
