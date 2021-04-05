import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { login } from '../login/login.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

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


  invalidField(field): boolean {
    return this.elementForm.get(field).touched && this.elementForm.get(field).invalid;
  }

  createForm(): void {
    this.elementForm = this.fb.group({
      username:  ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\_\-]{4,16}$')]],
      email:     ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // La contraseña debe tener al entre 6 y 20 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
      // NO puede tener otros símbolos.
      password1: ['', [Validators.required, Validators.pattern('^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{6,20}$')]],
      password2: ['', [Validators.required]]
    },
    {
      validators: this.equalPasswords('password1', 'password2')
    });
  }


  equalPasswords(password1: string , password2: string): any {
    return (formGroup: FormGroup) => {
      const pwd1 = formGroup.controls[password1];
      const pwd2 = formGroup.controls[password2];
      if ( pwd1.value === pwd2.value ) {
        pwd2.setErrors(null);
      } else {
        pwd2.setErrors({ notEqual: true });
      }
    }
  }

  submit(): void {
    this.loader = true;
    if  ( !this.elementForm.valid ) {
      
      Object.values( this.elementForm.controls ).forEach(control => {
        control.markAllAsTouched();
      });
      this.loader = false;
      return;

    } else {
      // Llamar al servicio para registrar al usuario
      this.user.username = this.elementForm.get('username').value;
      this.user.email = this.elementForm.get('email').value;
      this.user.password = this.elementForm.get('password1').value;

      this.userService.register(this.user).subscribe(user => {
        if ( user ) {
          this.status = 'success';
          this.alertMessage = 'You have been registered with success !';
          this.elementForm.reset();
          login(this.userService, this.user).then( (value:any) => {
            // Guardar el token y la identidad del usuario en localstorage
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
      }, error => {
        this.loader = false;
        this.errors = error.error.errors;
        this.status = 'error';
        this.elementForm.get('password1').setValue(null);
        this.elementForm.get('password2').setValue(null);
      });
    }
  }

}
