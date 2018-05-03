import { Injectable, DoCheck } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';


import { Pet } from './pet.model';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable()
export class PetService {


  url = 'http://localhost:8888/api/pets';

  selectedPet: Pet;
  petList: Pet[];

  constructor(private http: HttpClient, private messageService: MessageService) {

  }



  // getPets (): Observable<Pet[]> {
  //   return this.http.get<Pet[]>(this.url)
  // }

  showTodayDate() {
    const ndate = new Date();
    return ndate;
  }


  getPets (): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url)
      .pipe(
        tap(pets => this.log(`fetched pets`)),
        catchError(this.handleError('getPets', []))
      );
  }

   /** GET pet by id. Return `undefined` when id not found */
   getPetNo404<Data>(id: number): Observable<Pet> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Pet[]>(url)
      .pipe(
        map(pets => pets[0]), // returns a {0|1} element array
        tap(p => {
          const outcome = p ? `fetched` : `did not find`;
          this.log(`${outcome} pet id=${id}`);
        }),
        catchError(this.handleError<Pet>(`getPet id=${id}`))
      );
  }

  /** GET pet by id. Will 404 if id not found */
  getPet(id: number): Observable<Pet> {
    const url = `${this.url}/${id}`;
    console.log(url);
    return this.http.get<Pet>(url).pipe(
      tap(_ => this.log(`fetched pet id=${id}`)),
      catchError(this.handleError<Pet>(`getPet id=${id}`))
    );
  }

  /* GET pets whose name contains search term */
  searchPets(term: string): Observable<Pet[]> {
    if (!term.trim()) {
      // if not search term, return empty pet array.
      return of([]);
    }
    return this.http.get<Pet[]>(`api/pets/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Pet[]>('searchPets', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new pet to the server */
  addPet (pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.url, pet, httpOptions).pipe(
      tap((pet: Pet) => this.log(`added pet id=${pet.id}`)),
      catchError(this.handleError<Pet>('addPet'))
    );
  }

  /** DELETE: delete the pet from the server */
  deletePet (pet: Pet | number): Observable<Pet> {
    const id = typeof pet === 'number' ? pet : pet.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Pet>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted pet id=${id}`)),
      catchError(this.handleError<Pet>('deletePet'))
    );
  }

  /** PUT: update the pet on the server */
  updatePet (pet: Pet): Observable<Pet> {
    const url = `${this.url}/${pet.id}`;
    console.log(url);
    return this.http.put(url, pet, httpOptions).pipe(
      tap(_ => this.log(`updated pet id=${pet.id}`)),
      catchError(this.handleError<any>('updatePet'))
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







