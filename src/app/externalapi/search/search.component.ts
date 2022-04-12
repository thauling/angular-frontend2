import { Component, OnInit } from '@angular/core';

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

  constructor(
    private externalapiService: ExternalapiService,
    private userService: UserService,
    private router: Router) {}

  externalrecipes: any = [];
 
  dishtypes: string[] = ['Starter','Main course', 'Desserts'];
  diettypes: string[] = ['balanced','high-protein','low-carb','low-fat','low-sodium'];
  cuisinetypes: string[] = ['American','Asian','British','Caribbean','Central Europe','Chinese','Eastern Europe','French','Indian','Italian','Japanese','Kosher',
  'Mediterranian','Mexican','Middle Eastern','Nordic','South American','South East Asian'];
  healthtypes: string[] = ['alcohol-free','egg-free','dairy-free','gluten-free','kosher','peanut-free'];

  // query: Externalapi = {
  //   term: 'chocolate',
  //   diet: 'balanced',
  //   dish: 'Starter',
  //   health: 'kosher',
  //   cuisine: 'American',
  // };

  query: Externalapi = {
    term: '',
    diet: '',
    dish: '',
    health: '',
    cuisine: '',
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
    
  }

  submitted = false;

  onSubmit(): void { this.submitted = true;
    console.log('submitted');
    this.externalapiService.findAll(this.query).subscribe((data: any) => {
      this.externalrecipes = data;
     
      this.message = 'Searching for ' + this.query.term;

      // console.log(this.externalrecipes);

    }); 
  }

  addToList(items: string[]) {
    console.log(items);

    this.recipe = {
    id: 0,
    name: items[0],
    body: items[1],
    cuisine: items[2],
   
    };

    this.externalapiService.create(this.recipe).subscribe(res => {

      this.message = this.recipe.name + ' added to my recipes. Yum yum!';
      this.router.navigateByUrl('search');
 })
} 


public isLoggedIn(): string | null {
  return this.userService.isLoggedIn();
} 

}
