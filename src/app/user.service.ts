import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user.model';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};


@Injectable()
export class UserService {

  url = 'http://localhost:8888/api/users';

  users: User[];
  constructor(private http: HttpClient, private messageService: MessageService) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
    .pipe(
      tap(users => this.log(`fetched users`)),
      catchError(this.handleError('getuser', []))
       );
  }


    /** POST: add a new user to the server */
    addUser(user: User): Observable<User> {
      return this.http.post<User>(this.url, user, httpOptions).pipe(
        tap((user: User) => this.log(`added pet id=${user.id_user}`)),
        catchError(this.handleError<User>('addUser'))
      );
    }


    /** DELETE: delete the user from the server */
    deleteUser (user: User | number): Observable<User> {
      const id = typeof user === 'number' ? user : user.id_user;
      const url = `${this.url}/${id}`;

      return this.http.delete<User>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted user id=${id}`)),
        catchError(this.handleError<User>('deleteUser'))
      );
    }

    /** PUT: update the pet on the server */
    updateUser (user: User): Observable<User> {
      const url = `${this.url}/${user.id_user}`;
      console.log(url);
      return this.http.put(url, user, httpOptions).pipe(
        tap(_ => this.log(`updated user id=${user.id_user}`)),
        catchError(this.handleError<any>('updateUser'))
      );
    }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PetService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PetService: ' + message);
  }
  

}


