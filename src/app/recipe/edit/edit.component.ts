import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number = 0;
  recipe: Recipe = {
    id: 99,
    name: 'add name',
    body: 'add content',
    cuisine: 'specify cuisine',
    strength: 1
};
  form: FormGroup = new FormGroup({
    prop:  new FormControl('') // to initialize form 
  });

  constructor(
    public recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idRecipe'];
    this.recipeService.find(this.id).subscribe((data: Recipe)=>{
      this.recipe = data;
    });

    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      body: new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      cuisine: new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      strength: new FormControl('', [ Validators.required, Validators.pattern("^[1-5]*$") ])
    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.recipeService.update(this.id, this.form.value).subscribe(res => {
         console.log('Recipe updated successfully!');
         this.router.navigateByUrl('recipe/index');
    })
  }

}
