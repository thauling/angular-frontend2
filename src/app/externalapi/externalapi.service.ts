import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
import { catchError, map, tap } from 'rxjs/operators';
import { Externalapi } from './externalapi';

@Injectable({
  providedIn: 'root'
})
export class ExternalapiService {

  apiData: any;

  // temp: hard-code params for api
//   apiInput: Externalapi = {
//     diet: 'low-carb',
//     health: 'gluten-free',
//     cuisineType: 'American',
//     mealType: 'Lunch',
//     dishType: 'Main'
// };

// https://api.edamam.com/api/recipes/v2?type=public&beta=false
// &q=chicken
// &app_id=2800d86e&app_key=41c010254c6bfb7abd7cb5caf0d4a49d
//&diet=low-carb
//&health=gluten-free
//&cuisineType=American
//&mealType=Lunch
//&dishType=Main
//%20course

  // private apiURL: string = `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${this.apiInput.query}
  // &app_id=2800d86e&app_key=41c010254c6bfb7abd7cb5caf0d4a49d&diet=${this.apiInput.diet}
  // &health=${this.apiInput.health}
  // &cuisineType=${this.apiInput.cuisineType}
  // &mealType=${this.apiInput.mealType}
  // &dishType=${this.apiInput.dishType}%20course`;

  private apiURL: string = 'https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=chicken&app_id=2800d86e&app_key=41c010254c6bfb7abd7cb5caf0d4a49d&diet=low-carb&health=gluten-free&cuisineType=American&mealType=Lunch&dishType=Main%20course';

  private urlPart1: string = 'https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=';
  private urlPart2: string = '&app_id=2800d86e&app_key=41c010254c6bfb7abd7cb5caf0d4a49d';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Externalapi[]> {
    return this.httpClient.get<Externalapi[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  searchRecipes(term: string): Observable<Externalapi[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.httpClient.get<Externalapi[]>(`${this.apiURL}/?name=${term}`).pipe(
      tap(x => x.length ?
         console.log(`found recipes matching "${term}"`) :
         console.log(`no recipes matching "${term}"`)),
         catchError(this.errorHandler)
      // catchError(this.handleError<Externalapi[]>('searchRecipes', []))
    );
  }

  find(query: string): Observable<Externalapi> {
    return this.httpClient.get<Externalapi>(this.urlPart1 + query + this.urlPart2)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
