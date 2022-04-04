import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Externalapi } from '../externalapi';
import { ExternalapiService } from '../externalapi.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 apiData: any;

  
  // need >= 6 filters (starter, main, desssert plus >= 3 other filters, eg gluten-free, nuts, vegetarian, vegan) 
  //request url
  // type, query, app_id, app_key, diet, health, cuisine, mealType, dishType

  // https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=chicken&app_id=2800d86e&app_key=41c010254c6bfb7abd7cb5caf0d4a49d&diet=low-carb&health=gluten-free&cuisineType=American&mealType=Lunch&dishType=Main%20course
  
  // Response Content Type application/json


  // apiURL: string = `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${this.apiInput.query}
  // &app_id=2800d86e&app_key=41c010254c6bfb7abd7cb5caf0d4a49d&diet=${this.apiInput.diet}
  // &health=${this.apiInput.health}
  // &cuisineType=${this.apiInput.cuisineType}
  // &mealType=${this.apiInput.mealType}
  // &dishType=${this.apiInput.dishType}`


  constructor(public externalapiService:ExternalapiService) { }

  // externalrecipes: Externalapi[] = [];
  // hits[0].recipe
  // hits[0].recipe.image
  externalrecipes: any = [];             

  recipes$!: Observable<Externalapi[]>;  
  private searchTerms = new Subject<string>();

  output: Externalapi = {
    diet: [],
    health: [],
    cuisineType: [],
    mealType: [],
    dishType: []
};

//hits
// hits[0].recipe.label
// dishType[0]
 // Push a search term into the observable stream.
 search(term: string): void {
  this.searchTerms.next(term);
}

  ngOnInit(): void {
    this.recipes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.externalapiService.searchRecipes(term)),
    );

    this.externalapiService.getAll().subscribe((data: any)=>{
      this.externalrecipes = data;      
      this.output.diet = data.hits.recipe;
                           
      console.log(this.externalrecipes);
      
      for (let index in this.externalrecipes.hits) {
        console.log(this.externalrecipes.hits[index].recipe.label);
      }
     // console.log(this.output.diet);


  })
  }


}
