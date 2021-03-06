import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {


  form: FormGroup = new FormGroup({
    prop:  new FormControl('') // to initialize form 
  });

  // for messages that are displayed to the user
  message: string = '';

  constructor(
    public recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required ]),
      body: new FormControl('', [ Validators.required ]),
      cuisine: new FormControl('', [ Validators.required ])
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.recipeService.create(this.form.value).subscribe(res => {
        //  console.log('Recipe created successfully!');
         this.message = 'Recipe created.';
         this.router.navigateByUrl('recipe/index');
    })
  }

}
