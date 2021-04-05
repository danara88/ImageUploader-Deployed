import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  public identity: User;
  constructor( private userService: UserService, private router: Router ) {
    this.identity = this.userService.getIdentity();
  }
  canActivate(): boolean {
    if(this.identity && this.identity._id) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
