# this app is based on three tutorials (code has been adapted to suit the needs of the assigment and supplemented by own code):
https://www.tutofox.com/angular/fullstack-crud-app-angular-10-laravel-8-mysql/ for recipe funtionality and
https://www.bezkoder.com/angular-13-form-validation/ for user login/ registration functionality
https://www.positronx.io/angular-jwt-user-authentication-tutorial/ for login/ registration/ auth functionality



## example EDAMAM url:

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
  

## for ng build:
in angular.json, in line 66, I had to change 
   "defaultConfiguration": "production"   to  "defaultConfiguration": "development"  