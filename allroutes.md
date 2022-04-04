{ path: 'search', component: SearchComponent }

{ path: 'user/create', component: CreateComponent },
{ path: 'user/login', component: LoginComponent },
{ path: 'user/logout', component: LogoutComponent }

{ path: 'recipe', redirectTo: 'recipe/index', pathMatch: 'full'},
{ path: 'recipe/index', component: IndexComponent },
{ path: 'recipe/create', component: CreateComponent },
{ path: 'recipe/edit/:idRecipe', component: EditComponent } 