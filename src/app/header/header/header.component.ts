import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public isLoggedIn(): string|null {
    return this.userService.isLoggedIn();
  }

  public logout(): void {
    this.userService.logout();
  }
}
