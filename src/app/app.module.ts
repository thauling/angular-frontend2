import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { SearchComponent } from './externalapi/search/search.component';
import { HeaderComponent } from './header/header/header.component';

import { UserInterceptor  } from './user/user.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecipeModule,
    UserModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
