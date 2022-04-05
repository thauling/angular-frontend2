# this app is based on two tutorials:
https://www.tutofox.com/angular/fullstack-crud-app-angular-10-laravel-8-mysql/ for recipe funtionality and
https://www.bezkoder.com/angular-13-form-validation/ for user login/ registration functionality



example url:

 https://api.edamam.com/api/recipes/v2?type=public&beta=false
 &q=chicken
 &app_id=2800d86e&app_key=41c010254c6bfb7abd7cb5caf0d4a49d
 &diet=low-carb
 &health=gluten-free
 &cuisineType=American
 &mealType=Lunch
 &dishType=Main
 %20course

and in code:
  private apiURL: string = `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${this.apiInput.query}
  &app_id=2800d86e&app_key=41c010254c6bfb7abd7cb5caf0d4a49d&diet=${this.apiInput.diet}
  &health=${this.apiInput.health}
  &cuisineType=${this.apiInput.cuisineType}
  &mealType=${this.apiInput.mealType}
  &dishType=${this.apiInput.dishType}%20course`;


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