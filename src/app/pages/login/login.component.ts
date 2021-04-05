import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  public elementForm: FormGroup;
  public user: User;
  public loader: boolean;
  public status: string;
  public alertMessage: string;
  public errors: Array<any>;
  constructor( private fb: FormBuilder, private userService: UserService, private router: Router ) { 
    this.loader = false;
    this.user = new User(null, '', '', '', '');
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.elementForm = this.fb.group({
      username:  ['', [Validators.required]],
      password:  ['', [Validators.required]],
    });
  }

  submit(): void {
    if  ( this.elementForm.valid ) {
      this.loader = true;
      // Llamar al servicio para identificar al usuario al usuario
      this.user.username = this.elementForm.get('username').value;
      this.user.password = this.elementForm.get('password').value;

      login(this.userService, this.user).then( (value:any) => {
        // Guardar el token y la identidad del usuario en localstorage
        this.loader = false;
        localStorage.setItem('token', value.token);
        localStorage.setItem('identity', JSON.stringify(value.user));
        this.router.navigateByUrl('/home');
      } ).catch(err => {
        // Capturar el error y mostrarlo en pantalla
        this.loader = false;
        this.status = 'error';
        this.alertMessage = 'Incorrect username or password';
      });

    }
  }

}

export function login( userService, userToLogin ) {
  return new Promise((resolve, reject) => {
    userService.login(userToLogin).subscribe(resp => {
      if ( resp.user && resp.token ) {
        resolve({
          token: resp.token,
          user: resp.user
        });
      }
    }, error => {
       reject(error.error.errors);
    });
  });
}
