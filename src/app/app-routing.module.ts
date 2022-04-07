import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './auth.guard';
import { SearchComponent  } from './externalapi/search/search.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  // { path: '**', component: NotFoundComponent }, // need to add this - where?
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
