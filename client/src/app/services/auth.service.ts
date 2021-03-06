import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService} from '@auth0/angular-jwt';

import { User } from '../models/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  private authToken: any;
  private endpoint = 'https://myportfolio-mean-dw.herokuapp.com/api/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService
  ) {
    this.user = new User();
  }

  // GET API - POST /register
  public registerUser(user: User): Observable<any> {
    return this.http.post<any>(this.endpoint + 'register', user, this.httpOptions);
  }

  // GET API - POST /register
  public authenticateUser(user: User): Observable<any> {
    return this.http.post<any>(this.endpoint + 'login', user, this.httpOptions);
  }
  // Store a session data for user auth
  public storeUserData(token: any, user: User): void {
    localStorage.setItem('id_token', 'Bearer ' + token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  public logout(): Observable<any> {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    return this.http.get<any>(this.endpoint + 'logout', this.httpOptions);
  }

  public loggedIn(): boolean {
    return !this.jwtService.isTokenExpired(this.authToken);
  }
}
