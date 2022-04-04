import { Component, OnInit } from '@angular/core';
import { Externalapi } from '../externalapi';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 apiData: any;

  apiInput: Externalapi = {
    query: '',
    diet: '',
    health: '',
    cuisineType: '',
    mealType: '',
    dishType: ''
};

  // need >= 6 filters (starter, main, desssert plus >= 3 other filters, eg gluten-free, nuts, vegetarian, vegan) 
  //request url
  // type, query, app_id, app_key, diet, health, cuisine, mealType, dishType

  // https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=chicken&app_id=2800d86e&app_key=41c010254c6bfb7abd7cb5caf0d4a49d&diet=low-carb&health=gluten-free&cuisineType=American&mealType=Lunch&dishType=Main%20course
  
  // Response Content Type application/json


  apiURL: string = `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${this.apiInput.query}
  &app_id=2800d86e&app_key=41c010254c6bfb7abd7cb5caf0d4a49d&diet=${this.apiInput.diet}
  &health=${this.apiInput.health}
  &cuisineType=${this.apiInput.cuisineType}
  &mealType=${this.apiInput.mealType}
  &dishType=${this.apiInput.dishType}`


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=chicken&app_id=2800d86e&app_key=41c010254c6bfb7abd7cb5caf0d4a49d&diet=low-carb&health=gluten-free&cuisineType=American&mealType=Lunch&dishType=Main%20course').subscribe({
      next: data => {
          this.apiData = data.total;
          console.log(this.apiData);
      },
      error: error => {
         // this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  })
  }

}
