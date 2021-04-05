import { Component, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  public token: string;
  public identity: User;
  constructor( private userService: UserService ) {
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  ngDoCheck(): void {
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  signOut(): void {
    this.userService.signOut();
  }
}
