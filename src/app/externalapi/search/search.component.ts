import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Externalapi } from '../externalapi';
import { ExternalapiService } from '../externalapi.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  // apiData: any;

  constructor(private externalapiService: ExternalapiService) {}

  externalrecipes: any = [];
 
  dishtypes: string[] = ['Starter','Main course', 'Desserts'];
  diettypes: string[] = ['balanced','high-protein','low-carb','low-fat','low-sodium'];
  cuisinetypes: string[] = ['American','Asian','British','Caribbean','Central Europe','Chinese','Eastern Europe','French','Indian','Italian','Japanese','Kosher',
  'Mediterranian','Mexican','Middle Eastern','Nordic','South American','South East Asian'];
  healthtypes: string[] = ['alcohol-free','egg-free','dairy-free','gluten-free','kosher','peanut-free'];
  // searchTerm: any = 'chocolate';

  query: Externalapi = {
    term: 'chocolate',
    diet: '',
    dish: '',
    health: '',
    cuisine: '',
  };

  ngOnInit(): void {
    this.externalapiService.findAll(this.query).subscribe((data: any) => {
      this.externalrecipes = data;
      // this.output.diet = data.hits.recipe;

      console.log(this.externalrecipes);

      for (let index in this.externalrecipes.hits) {
        console.log(this.externalrecipes.hits[index].recipe.label);
      }
      // console.log(this.output.diet);
    });
  }

  submitted = false;

  onSubmit(): void { this.submitted = true;
    console.log('submitted');
    this.externalapiService.findAll(this.query).subscribe((data: any) => {
      this.externalrecipes = data;
      // this.output.diet = data.hits.recipe;

      console.log(this.externalrecipes);

      // for (let index in this.externalrecipes.hits) {
      //   console.log(this.externalrecipes.hits[index].recipe.label);
      // }
    }); 
  }

  addToList() { console.log('index.recipe.url to my list');} //need to use two-way binding
}
