import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Recipe } from './recipe';
@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  private apiURL = "http://localhost:8000/api/recipe/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>(this.apiURL, JSON.stringify(recipe), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  find(id: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(this.apiURL + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  update(id: number, recipe: Recipe): Observable<Recipe> {
    return this.httpClient.put<Recipe>(this.apiURL + id, JSON.stringify(recipe), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  delete(id: number){
    return this.httpClient.delete<Recipe>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  errorHandler(error: any) { // should be sth else than any
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
 

 
}
