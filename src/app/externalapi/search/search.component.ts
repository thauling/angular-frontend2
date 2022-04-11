import { Component, OnInit } from '@angular/core';
// import { Observable, Subject } from 'rxjs';

// import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Externalapi } from '../externalapi';
import { ExternalapiService } from '../externalapi.service';
import { UserService } from '../../user/user.service';

import { Recipe } from '../../recipe/recipe';

import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  // apiData: any;

  constructor(
    private externalapiService: ExternalapiService,
    private userService: UserService,
    private router: Router) {}

  externalrecipes: any = [];
  // recipeLabel: string = '';
 
  dishtypes: string[] = ['Starter','Main course', 'Desserts'];
  diettypes: string[] = ['balanced','high-protein','low-carb','low-fat','low-sodium'];
  cuisinetypes: string[] = ['American','Asian','British','Caribbean','Central Europe','Chinese','Eastern Europe','French','Indian','Italian','Japanese','Kosher',
  'Mediterranian','Mexican','Middle Eastern','Nordic','South American','South East Asian'];
  healthtypes: string[] = ['alcohol-free','egg-free','dairy-free','gluten-free','kosher','peanut-free'];
  // searchTerm: any = 'chocolate';

  query: Externalapi = {
    term: 'chocolate',
    diet: 'balanced',
    dish: 'Starter',
    health: 'kosher',
    cuisine: 'American',
  };

  // initialize recipe so that it can be used in addRecipe()
  recipe: Recipe = {
    id: 0, // pseudo-id 
    name: '',
    body: '',
  }

// for messages that are displayed to the user
  message: string = '';

  ngOnInit(): void {
    // this.externalapiService.findAll(this.query).subscribe((data: any) => {
    //   this.externalrecipes = data;
  
    //   // console.log(this.externalrecipes);

    //   for (let index in this.externalrecipes.hits) {
    //     console.log(this.externalrecipes.hits[index].recipe.label);
    //   }
     
    // });
  }

  submitted = false;

  onSubmit(): void { this.submitted = true;
    console.log('submitted');
    this.externalapiService.findAll(this.query).subscribe((data: any) => {
      this.externalrecipes = data;
      // this.output.diet = data.hits.recipe;
      this.message = 'Searching for ' + this.query.term;

      console.log(this.externalrecipes);

      // for (let index in this.externalrecipes.hits) {
      //   console.log(this.externalrecipes.hits[index].recipe.label);
      // }
    }); 
  }

  addToList(items: string[]) {
    console.log(items);

    this.recipe = {
    id: 0,
    name: items[0],
    body: items[1],
    cuisine: items[2],
    // user_id: 0,        //add a user id placeholder that will be relaced by actual user id
    };
    // console.log(this.recipe);
    this.externalapiService.create(this.recipe).subscribe(res => {
      // console.log('Recipe created successfully!');
      this.message = this.recipe.name + ' added to my recipes. Yum yum!';
      this.router.navigateByUrl('search');
 })
} 


public isLoggedIn(): string | null {
  return this.userService.isLoggedIn();
} 

}
