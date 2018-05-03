import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {of} from "rxjs/observable/of";
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Raza } from './raza.model';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};


@Injectable()
export class RazaService {

  raza: Raza[];

  url = 'http://localhost:8888/api/razas';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getRazas () {
    return this.http.get(this.url);

  }


}





