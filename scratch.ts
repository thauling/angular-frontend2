
// // in routing-module(s), eg app-routing
// const routes = [
// { path: '', redirectTo: '/login', pathMatch: 'full'},
// // remaining PUBLIC routes

// // for (recipe/ logout) routes that require auth, do

// { path: '/recipe', 
// component: RecipeComponent,
// canActivate [AuthGuard], // need to create AuthGuard, (and canActivate?)
// }
// ]


// user.ts

export class User {
    _id!: String;
    name!: String;
    email!: String;
    password!: String;  
}

//why class and not interface?  ! meaning CANNOT be null 


// AuthGuard implements CanActivate {}


// inside authconfig.interceptor.ts
// req = req.clone({
// // setHeaders: { 
//     Authorization 'Bearer ' + authToken,
// }, 
// });
