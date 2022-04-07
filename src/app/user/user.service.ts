import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UserLogin} from './user';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'http://localhost:8000/api/register/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  // note to self: remove type 'any' later!

  create(User: any): Observable<User> {
    const url = 'http://localhost:8000/api/register/';
    return this.httpClient
      .post<User>(url, JSON.stringify(User), this.httpOptions)
      .pipe(catchError(this.errorHandler));
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

  // header spec for user authentication
  requestHeader = new HttpHeaders(
    {"Auth":"True"}
  );

  login(user: UserLogin): void  {
    const url = 'http://localhost:8000/api/login/';
    this.httpClient.post<any>(url, user, {headers: this.requestHeader}).subscribe((res) => {
      console.log(res.token);
      console.log(res.user);
      //  store token on local storage to check for login?
      this.setToken(res.token);
      localStorage.getItem('token') ?  console.log('User logged in!'): console.log('Something went wrong');

    })
  }

  logout(): void {
    // const url = 'http://localhost:8000/api/logout/';
    // logout by clearing localStorage
    localStorage.clear();
    localStorage.getItem('token') ?  console.log('User logged in!'): console.log('Logged out');

  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  
  // clearLocalStorage(): void {
  //   localStorage.clear();
  // }

  isLoggedIn() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }
  
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
