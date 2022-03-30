import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'recipe', redirectTo: 'recipe/index', pathMatch: 'full'},
  { path: 'recipe/index', component: IndexComponent },
  { path: 'recipe/create', component: CreateComponent },
  { path: 'recipe/edit/:idRecipe', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
