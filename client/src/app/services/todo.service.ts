import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from '../models/todo';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private user: User;
  private authToken: any = null;
  private endpoint = 'https://myportfolio-mean-dw.herokuapp.com/api/todo/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient) {
    this.user = new User();
   }
   // Getting a todo list
   public getList(): Observable<any> {
    this.loadToken();
    return this.http.get<any>(this.endpoint, this.httpOptions);
  }
  // Getting a todo item
  public getTodo(todo: Todo): Observable<any> {
    this.loadToken();
    return this.http.get<any>(this.endpoint + 'edit/' + todo._id, this.httpOptions);
  }
  // Adding a todo item
  public addTodo(todo: Todo): Observable<any> {
    this.loadToken();
    return this.http.post<any>(this.endpoint + 'add', todo, this.httpOptions);
  }
  // Editting a todo item
  public editTodo(todo: Todo): Observable<any> {
    this.loadToken();
    return this.http.post<any>(this.endpoint + 'edit/' + todo._id, todo, this.httpOptions);
  }
  // Deleting a todo item
  public deleteTodo(todo: Todo): Observable<any> {
    this.loadToken();
    return this.http.get<any>(this.endpoint + 'delete/' + todo._id, this.httpOptions);
  }
  // Getting a session token for auth
  private loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }}
