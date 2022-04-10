import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    prop:  new FormControl('') // to initialize form 
  });

  constructor(
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.minLength(8) ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', [ Validators.required, Validators.minLength(8) ])
    });
  }

  get f(){
    return this.form.controls;
  }

  
  submitted = false;

  submit(){
    this.submitted = true;
    console.log(this.form.value);
    this.userService.create(this.form.value).subscribe(res => {
         console.log('User created successfully!');
         this.router.navigateByUrl('/');
    })
  }


}
