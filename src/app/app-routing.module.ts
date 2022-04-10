import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './auth.guard';
import { SearchComponent  } from './externalapi/search/search.component';

import { RegisterComponent  } from './user/register/register.component';
import { LoginComponent  } from './user/login/login.component';
import { LogoutComponent  } from './user/logout/logout.component';

import { IndexComponent } from './recipe/index/index.component';
import { CreateComponent } from './recipe/create/create.component';
import { EditComponent } from './recipe/edit/edit.component';

import { UserGuard } from "./user/user.guard";

const routes: Routes = [
  // any-user (guest included) functionality
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/login', component: LoginComponent },

  { path: 'search', component: SearchComponent },
  // { path: '**', component: NotFoundComponent }, // need to add this - where?

  // functionality that requires authenticated user
  { path: 'user/logout', component: LogoutComponent, canActivate: [UserGuard] },
  // user-specific (recipe) funtionality
  { path: 'recipe', redirectTo: 'recipe/index', pathMatch: 'full'},
  { path: 'recipe/index', component: IndexComponent, canActivate: [UserGuard] },
  { path: 'recipe/create', component: CreateComponent, canActivate: [UserGuard] },
  { path: 'recipe/edit/:idRecipe', component: EditComponent, canActivate: [UserGuard] } 

  // { path: 'recipe', component: RecipeComponent, canActivate: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
