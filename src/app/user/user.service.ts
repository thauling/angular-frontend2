import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = "http://localhost:8000/api/register/";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]> {
   return this.httpClient.get<User[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 // note to self: remove type 'any' later!
  
 create(User: any): Observable<User> {
   return this.httpClient.post<User>(this.apiURL, JSON.stringify(User), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

//  find(id: any): Observable<User> {
//    return this.httpClient.get<User>(this.apiURL + id)
//    .pipe(
//      catchError(this.errorHandler)
//    )
//  }

//  update(id: any, User: any): Observable<User> {
//    return this.httpClient.put<User>(this.apiURL + id, JSON.stringify(User), this.httpOptions)
//    .pipe(
//      catchError(this.errorHandler)
//    )
//  }

//  delete(id: any){
//    return this.httpClient.delete<User>(this.apiURL + id, this.httpOptions)
//    .pipe(
//      catchError(this.errorHandler)
//    )
//  }

 errorHandler(error: any) {
   let errorMessage = '';
   if(error.error instanceof ErrorEvent) {
     errorMessage = error.error.message;
   } else {
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   return throwError(errorMessage);
 }

}
