import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, UserLogin} from './user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private apiURL = 'http://localhost:8000/api/register/';

  // Heroku (trailing '/' MUST be removed)
  // private apiURL = 'https://u06-recipe-api.herokuapp.com/api/register';

  requestHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private httpClient: HttpClient, public router: Router) {}

  // getAll(): Observable<User[]> {
  //   return this.httpClient
  //     .get<User[]>(this.apiURL)
  //     .pipe(catchError(this.errorHandler));
  // }


  create(User: User): Observable<User> {
    // const url = 'http://localhost:8000/api/register/';

    const url = 'https://u06-recipe-api.herokuapp.com/api/register'; 

    return this.httpClient
      .post<User>(url, JSON.stringify(User), this.requestHeader)
      .pipe(catchError(this.errorHandler));
  }
  


  login(user: UserLogin) {
    // const url = 'http://localhost:8000/api/login/';

    const url = ' https://u06-recipe-api.herokuapp.com/api/login';
  
    return this.httpClient.post<any>(url, user).subscribe((res) => {
     
      this.setToken(res.token);
    })
  }

  logout() {
    // logout by removing token from local storage
    localStorage.removeItem('showapptoken');
    // better safe than sorry...
    localStorage.clear();
    if (this.getToken()) { this.router.navigate(['search'])} 

  }

  setToken(token: string): void {
    localStorage.setItem('showapptoken', token);  //JSON.stringify(token) should not be needed
  }

  
  getToken(){
    return localStorage.getItem('showapptoken');
  } 
  

  isLoggedIn(): string | null {
    // console.log(localStorage.getItem('showapptoken'));
    return this.getToken();
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
